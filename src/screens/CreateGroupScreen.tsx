import { useState, useEffect } from "react"
import { db, getAuth } from "../config/firebase";
import { arrayUnion, updateDoc, collection, doc, setDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";

export default function CreateGroupScreen() {
  const [key, setKey] = useState("")
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user)
      } else {
        setUser(user)
      }
    })
  })
  const [groupName, setGroupName] = useState("");

  const [user, setUser] = useState(auth.currentUser)


  const copyKey = () => {
    navigator.clipboard.writeText(key);
  }
  const createGroup = async () => {
    if (!user) {
      alert("you must be logged in to create a group");
    } else {

      //TODO: Error handling

      //add to groups collection
      const groupRef = doc(collection(db, "groups"));
      await setDoc(groupRef, {
        name: groupName,
        owner: user.uid,
        members: [user.uid],
        meeting_times: []
      })
      setKey(groupRef.id);

      //add to user profile
      const userRef = doc(db, "users", user.uid)
      await updateDoc(userRef, {
        groups: arrayUnion({ name: groupName, id: groupRef.id })
      })

    }
  }

  return (
    <div className="pt-20">
      <div className="m-auto">
        <h1>How to Create a Group</h1>
        <ul className="list-inside">
          <li>Enter your desired Group Name</li>
          <li>Click on the Create Group button</li>
          <li>Copy the unique key and share this with your group members</li>
          <li>Your group members need to join your group with this key</li>
        </ul>
      </div>
      <div className="mt-12">
        <input type="text" placeholder="Group Name" onChange={event => setGroupName(event.target.value)} />
      </div>
      <button className="my-12" onClick={createGroup}>Click to create Group</button>
      <div className="my-12">
        <p className="my-6">Unique Key:</p>
        {key !== "" ?

          <p className="w-max m-auto p-2  my-6 border-2 border-solid">{key}</p>

          : <p className="m-auto p-2  my-6 "></p>}
        <button onClick={copyKey}>copy key</button>
      </div>

    </div>
  )

}
