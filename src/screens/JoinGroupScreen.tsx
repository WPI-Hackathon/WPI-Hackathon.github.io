import { useEffect, useState } from "react"
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"
import { db, getAuth } from "../config/firebase"
import { User, onAuthStateChanged } from "firebase/auth";

export default function JoinGroupScreen() {

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

  const [user, setUser] = useState(auth.currentUser)

  const [key, setKey] = useState("")

  const joinGroup = async () => {
    if (!user) {
      alert("you must be logged in to join a group")
    } else {

      //ensure group exists
      const groupRef = doc(db, "groups", key);
      const groupSnap = await getDoc(groupRef);
      console.log(groupSnap)

      if (groupSnap.exists()) {
        const groupData = groupSnap.data();

        //add to group
        await updateDoc(groupRef, {
          members: arrayUnion({ id: user.uid, name: user.displayName })
        })

        //add to user profile
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          groups: arrayUnion({ name: groupData.name, id: groupRef.id })
        });
      } else {
        alert("group does not exist");
      }

    }


  }

  return (
    <div className="pt-20">
      <div className="m-auto">
        <h1>How to Join a Group</h1>
        <ul className="list-inside">
          <li>Recieve a group key from a group owner</li>
          <li>Enter your group key below</li>
          <li>Click "Join Group"</li>
          <li>Your group will be shown on your dashboard, and your calendar will be shared with the group owner</li>
        </ul>
      </div>
      <div className="mt-12">
        <input className="w-1/4 text-center" type="text" placeholder="Group Key" onChange={event => setKey(event.target.value)} />
      </div>
      <button className="my-12" onClick={joinGroup}>Click to join Group</button>

    </div>
  )
}
