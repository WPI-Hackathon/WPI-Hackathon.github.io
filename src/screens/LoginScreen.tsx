import { User, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { getAuth } from "../config/firebase";
import { Link } from "react-router-dom";

export default function LoginScreen() {

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

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(auth.currentUser);



  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      setUser(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/invalid-credential") {
        alert("invlaid login")
      } else if (errorCode === "auth/too-many-requests") {
        alert("Too many invalid login attempts: Try again later, or reset password")
      } else {
        console.error(errorCode, errorMessage)
      }
    })
    console.log(user)
  }

  return (
    <section className="max-w-md mx-auto pt-24">
      {/* <div className="mb-4 text-center">{JSON.stringify(user)}</div> */}
      <div className="p-4 text-center">Login</div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="py-4">
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="py-8 text-center">
        <button
          onClick={login}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Submit
        </button>
      </div>
      <p>Need an account?</p>
      <Link to="/signup">Sign up here</Link>
    </section>
  );
}

