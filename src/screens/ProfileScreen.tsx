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
    <div className="h-full flex flex-col pt-20">
      <div className="flex">Welcome, {user?.displayName}</div>

      <div className="flex-auto justify-center">
        <div className="flex h-full">
          <div className="w-2/4 bg-red-900">calendarhere</div>
          <div className="w-2/4 bg-cyan-900">
            {groups.map((group: GroupData) =>
              <Group group_data={group} />
            )
            }

          </div>
        </div>
      </div>
    </div>
  )

}
