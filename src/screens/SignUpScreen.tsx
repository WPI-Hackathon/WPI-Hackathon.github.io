import { FirebaseError } from "firebase/app";
import { getAuth } from "../config/firebase"
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen() {

  const auth = getAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(JSON.stringify(auth.currentUser))


  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      //Signed up
      const user = userCredential.user;
      setUser(JSON.stringify(user));
      console.log(user)
    }).catch((error: FirebaseError) => {
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
      <div>{user}</div>
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
