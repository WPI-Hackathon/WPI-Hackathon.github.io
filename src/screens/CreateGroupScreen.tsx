import { useState, useEffect } from "react"
import { db, getAuth } from "../config/firebase";
import { arrayUnion, updateDoc, collection, doc, setDoc } from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { Alert } from "@mui/material";

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
  }, [])
  const [groupName, setGroupName] = useState("Unnamed");

  const [user, setUser] = useState(auth.currentUser);
  const [showAlert, setShowAlert] = useState(false);


  const copyKey = () => {
    navigator.clipboard.writeText(key);
  }
  const createGroup = async () => {
    if (!user) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    } else {

      //TODO: Error handling

      //add to groups collection
      const groupRef = doc(collection(db, "groups"));
      await setDoc(groupRef, {
        name: groupName,
        owner: user.uid,
        members: [{ id: user.uid, name: user.displayName }],
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
        <h1 className="font-semibold py-6">How to Create a Group</h1>
        <ul className="list-inside list-decimal">
          <li className="py-1">Enter your desired Group Name</li>
          <li className="py-1">Click on the Create Group button</li>
          <li className="py-1">Copy the unique key and share this with your group members</li>
          <li className="py-1">Your group members need to join your group with this key</li>
        </ul>
      </div>

      <div className="mt-10">
        <input
          type="text"
          placeholder="Group Name"
          onChange={(event) => setGroupName(event.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        className="my-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        onClick={createGroup}
      >
        Create Group
      </button>
      <div className="my-10">
        <p>Unique Key:</p>
        {key !== "" ? (
          <p className="w-max m-auto p-2 border-2 border-solid">{key}</p>
        ) : (
          <p className="m-auto p-2 my-6"></p>
        )}
        <button
          onClick={copyKey}
          className="my-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Copy Key
        </button>
      </div>
      {showAlert
        ?
        <Alert severity="info" className="absolute w-1/2  m-auto left-0 right-0 bottom-4">You must be logged in to create a group</ Alert>
        :
        null
      }
    </div>
  )

}
