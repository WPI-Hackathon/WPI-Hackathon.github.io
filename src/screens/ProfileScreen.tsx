import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import Group from "../components/Group"

export type GroupData = {
  name: string,
  members: string[]
};

const groups: GroupData[] = [
  {
    name: "g1",
    members: ["tom", "dick", "harry"]
  },
  {
    name: "g2",
    members: ["joe", "dick", "harry"]
  }
]



export default function ProfileScreen() {
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user)
      } else {
        setUser(user)
      }
    })
  })

  const [user, setUser] = useState(auth.currentUser)

  return (
    <div className="h-full flex flex-col items-center pt-20">
      <div className="text-center text-xl mb-4 font-semibold">👋 Welcome {user?.displayName}</div>

      <div className="flex-grow w-full flex">
        <div className="w-2/3 bg-indigo-300 flex-grow flex justify-center items-center">
          <h1 className="mb-2">Calendar Placeholder</h1>
        </div>
        <div className="w-1/3 flex-grow flex flex-col items-center">
          <h3 className="text-xl mb-4 font-semibold">Groups</h3>
          {groups.map((group: GroupData) => (
            // <Group key={group.name} group_data={group} />
            <div key={group.name} className="border-solid border-2 p-2 mb-6" style={{ width: "70%" }}>
              <div className="flex justify-center items-center flex-col">
                <p className="text-lg font-semibold">{group.name}</p>
                <p>{group.members.length} Members: {group.members.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
