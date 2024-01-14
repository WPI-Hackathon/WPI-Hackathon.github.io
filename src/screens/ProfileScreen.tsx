import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import Group from "../components/Group"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export type GroupData = {
  name: string,
  members: string[]
};

export default function ProfileScreen() {
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user)

        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then((userSnap) => {
          if (userSnap.exists()) {
            setGroups(userSnap.data().groups)
          }
        });

      } else {
        setUser(user)
      }
    })
  }, [])


  const [user, setUser] = useState(auth.currentUser)
  const [groups, setGroups] = useState([]);

  return (
    <div className="h-full flex flex-col items-center pt-20">
      <div className="text-center text-xl mb-4 font-semibold">👋 Welcome {user?.displayName}</div>
      {user ?
        <div className="flex-grow w-full flex">
          <div className="w-2/3 bg-indigo-300 flex-grow flex justify-center items-center">
            <h1 className="mb-2">Calendar Placeholder</h1>
          </div>
          <div className="w-1/3 flex-grow flex flex-col items-center">
            <h3 className="text-xl mb-4 font-semibold">Groups</h3>
            {groups.map((group: GroupData) => (
              <Group key={group.name} group={group} />
            ))}
          </div>
        </div>

        :
        <div>
          <p className="text-xl pt-40">Login to see joined groups</p>
        </div>

      }
    </div>
  );

}
