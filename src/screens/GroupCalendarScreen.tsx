import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";

function create2DCalendarArray() {

  return Array.from({
    // generate array of length m
    length: 7
    // inside map function generate array of size n
    // and fill it with `0`
  }, () => new Array(96).fill(0));
}

export default function GroupCalendarScreen() {

  //weird typescript error 
  const key = String(useParams<{ key: string }>().key);
  const [userCalendars, setUserCalendars] = useState<any>([]);
  const [members, setMembers] = useState<any>([]);
  const [name, setName] = useState("")

  useEffect(() => {
    const groupRef = doc(db, "groups", key)

    getDoc(groupRef).then((groupSnap) => {

      if (groupSnap.exists()) {
        setName(groupSnap.data().name)

        const members = groupSnap.data().members
        setMembers(members)

        let membersId: string[] = members.map((entry: any) => entry.id)
        const calendarsRef = collection(db, "calendars");
        const q = query(calendarsRef, where(documentId(), "in", membersId))

        getDocs(q).then((querySnapshot) => {

          const calendars = querySnapshot.docs.map((doc) => { return { id: doc.id, data: doc.data() } });
          setUserCalendars(calendars)

        })
      }
    })


  }, [])


  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const calendar = create2DCalendarArray();
  userCalendars.forEach((uc: any) => {
    const data = uc.data;

    for (const param in data) {
      const i = days.indexOf(param)
      for (let j = 0; j < data[param].length; j++) {
        calendar[i][j] += data[param][j]
      }
    }
  })

  let day = 0;

  const colors = Array(members.length)
  for (let i = 0; i <= members.length; i++) {
    const k = i / members.length
    colors[i] = `rgba(20, 83, 45, ${k})`;
  }


  //TODO: get all calendars from firestore
  return (
    <div >
      <h1 className="mt-24">Group: {name} </h1>
      <div className="mt-4">
        <span className="text-xl">Members: </span>
        <span className="text-xl">
          {
            members.map((member: any) => {
              return member.name
            }).toString()
          }
        </span>
      </div>

      <div className="mt-20  m-auto grid grid-cols-7 gap-0 w-1/2">
        {
          calendar.map((i) => (
            <div className="text-lg">
              {days[day++]}
              <div className="pt-2">
                {
                  i.map((j) => (
                    <div className="border-solid border-2 bg-green-90" style={{ backgroundColor: colors[j] }}>{j}</div>
                  ))}
              </div>
            </div>
          ))

        }
      </div>

    </div>
  )
};
