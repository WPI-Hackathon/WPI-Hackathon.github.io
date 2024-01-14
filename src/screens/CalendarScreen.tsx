import Calendar from "../components/calendar/Calendar";
import { db, getAuth } from "../config/firebase";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import { Alert } from "@mui/material";



export default function CalendarScreen() {
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user)
        setCalendar(create2DCalendarArray(user))
      } else {
        setUser(user)
        setCalendar(null)
      }
    })
  }, [])

  const [user, setUser] = useState(auth.currentUser);
  const [calendar, setCalendar] = useState<any>(null);

  const create2DCalendarArray = (user: User | null) => {
    if (user) {

      const userRef = doc(db, "calendars", user.uid);
      getDoc(userRef).then((userSnap) => {
        if (userSnap.exists()) {
          const data = userSnap.data();
          let arr = []
          arr.push(data.Sunday)
          arr.push(data.Monday)
          arr.push(data.Tuesday)
          arr.push(data.Wednesday)
          arr.push(data.Thursday)
          arr.push(data.Friday)
          arr.push(data.Saturday)
          setCalendar(arr);
        }
      });
    }
  }


  return (
    <div>
      {calendar
        ?
        <div className="flex flex-col items-center justify-center">
          <Calendar parseSchedule={calendar} />
        </div>
        :
        <div>
          <p className="text-xl pt-80">Login to set your calendar</p>
        </div>
      }
    </div>
  );
}
