import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"

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
    <div className="h-full flex flex-col">
      <div className="flex">Welcome, {user?.displayName}</div>

      <div className="flex-auto justify-center">
        <div className="flex h-full">
          <div className="w-3/4 bg-red-50">list groups here</div>
          <div className="w-1/4 bg-cyan-50">have calendar here</div>
        </div>
      </div>
    </div>
  )

}
