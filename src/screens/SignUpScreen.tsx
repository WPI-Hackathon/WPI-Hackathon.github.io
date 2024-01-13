import { getAuth } from "../config/firebase"
import { useState } from "react";
import { User, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      setUser(user)
    } else {
      setUser(user)
    }
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(auth.currentUser)


  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      //Signed up
      const user = userCredential.user;
      setUser(user);
      console.log(JSON.stringify(user))
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case "auth/weak-password":
          alert("Weak password, Password must be at least 6 characters");
          break;
        case "auth/invalid-email":
          alert("Invalid Email, Please use a valid email");
          break;
        case "auth/email-already-in-use":
          alert("Account already exists, Email already in use");
          break;
        default:
          console.error(errorCode, errorMessage)
      }

    })

  }
  return (
    <section>
      <div>{JSON.stringify(user)}</div>
      <div className="my-10">
        <input type="text" placeholder="email" onChange={event => setEmail(event.target.value)} />
      </div>
      <div className="my-10">
        <input type="text" placeholder="password" onChange={event => setPassword(event.target.value)} />
      </div>
      <div className="my-20">
        <button onClick={signup}>Submit</button>
      </div>
    </section>
  )
}
