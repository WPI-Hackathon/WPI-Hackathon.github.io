import { useState } from "react";
import DatePicker from "../components/calendar/DayPicker";
import Label from "../components/calendar/Label";

export default function CreateEventScreen() {
    // Use a 1d array of size 7, where 0 = not selected, 1 = selected
    // store id and index into array to change it, keep state this way.
    // days go from sunday (i=0) -> saturday (i=6)
    const [selectedDays, setSelectedDays] = useState([0, 0, 0, 0, 0, 0, 0]);

    console.log(typeof selectedDays);

    return (
        <div>
            <Label />
            <DatePicker
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
            />
        </div>
    );
}
