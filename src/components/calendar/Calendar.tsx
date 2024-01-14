import { useState, useEffect } from "react";
import { displaySchedule } from "../../helpers/displaySchedule";
import calcArea from "../../helpers/calcArea";
import CalendarHeader from "./CalendarHeader";
import { db, getAuth } from "../../config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "@mui/material";

export default function Calendar({ parseSchedule }: { parseSchedule: any }) {
  const [schedule, setSchedule] =
    useState<Array<Array<number>>>(parseSchedule);
  const [mouse, setMouse] = useState<boolean>(false);
  const [mode, setMode] = useState(0);
  const [start, setStart] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [showSaving, setSaving] = useState(false);
  const [showSaved, setSaved] = useState(true);


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


  useEffect(() => {
    setSaving(true);
    const saveData = setTimeout(() => {

      if (!user) {

      } else {
        const user_schedule = {
          Sunday: schedule[0],
          Monday: schedule[1],
          Tuesday: schedule[2],
          Wednesday: schedule[3],
          Thursday: schedule[4],
          Friday: schedule[5],
          Saturday: schedule[6]
        }
        setDoc(doc(db, "calendars", user.uid), user_schedule)
        setSaving(false);
        setSaved(true)

        setTimeout(() => {
          setSaved(false)
        }, 2000)

      }
    }, 2000);

    return () => clearTimeout(saveData);
  }, [schedule]);

  useEffect(() => {
    setSchedule((prevSchedule: number[][]) => {
      prevSchedule = calcArea(
        prevSchedule,
        schedule[0].length,
        start,
        current,
        mode
      );
      return [...prevSchedule];
    });
  }, [start, current]);

  const display = displaySchedule(
    schedule,
    setSchedule,
    mouse,
    mode,
    setMode,
    setStart,
    setCurrent
  );

  function handleMouseDown() {
    setMouse(true);
  }

  function handleMouseUp() {
    setMouse(false);
    setCurrent(-1);
    setStart(-1);
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col ">
        <CalendarHeader />
        <div
          className="flex flex-col mb-10"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {display}
        </div>
      </div>

      {showSaving
        ?
        <Alert severity="info" className="fixed w-1/2  m-auto left-0 right-0 bottom-4">Saving...</ Alert>
        :
        showSaved
          ?
          <Alert severity="success" className="fixed w-1/2  m-auto left-0 right-0 bottom-4">Saved</Alert>
          :
          null
      }
    </div>
  );
}
