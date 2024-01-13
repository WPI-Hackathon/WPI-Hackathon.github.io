import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { getAuth } from "../config/firebase";

export default function LoginScreen() {

  const auth = getAuth();
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
    <section>
      <div className="my-10">
        <input type="text" placeholder="email" onChange={event => setEmail(event.target.value)} />
      </div>
      <div className="my-10">
        <input type="text" placeholder="password" onChange={event => setPassword(event.target.value)} />
      </div>
      <div className="my-20">
        <button onClick={login}>Submit</button>
      </div>
    </section>
  )
}

