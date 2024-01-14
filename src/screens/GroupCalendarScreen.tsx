import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";

export default function GroupCalendarScreen() {

  //weird typescript error 
  const key = String(useParams<{ key: string }>().key);
  const [userCalendars, setUserCalendars] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);

  useEffect(() => {
    const groupRef = doc(db, "groups", key)

    getDoc(groupRef).then((groupSnap) => {

      if (groupSnap.exists()) {

        const members = groupSnap.data().members
        setMembers(members)

        let membersId: string[] = members.map((entry: any) => entry.id)
        const calendarsRef = collection(db, "calendars");
        const q = query(calendarsRef, where(documentId(), "in", membersId))

        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserCalendars([...userCalendars, { id: doc.id, data: doc.data() }])
          })
        })
      }
    })


  }, [])

  //TODO: get all calendars from firestore
  return (
    <div>
      <h1 className="mt-20"> {typeof key} </h1>
    </div>
  )
};
