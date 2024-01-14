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
        <h1 className="font-semibold py-6">How to Join a Group</h1>
        <ul className="list-inside list-decimal">
          <li className="py-1">Recieve a group key from a group owner</li>
          <li className="py-1">Enter your group key below</li>
          <li className="py-1">Click "Join Group"</li>
          <li className="py-1">Your group will be shown on your dashboard, and your calendar will be shared with the group owner</li>
        </ul>
      </div>
      <div className="mt-10">
        <input
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Group Key"
          onChange={event => setKey(event.target.value)}
        />
      </div>
      <button
        className="my-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        onClick={joinGroup}
      >
        Click to join Group
      </button>

    </div>
  )
}
