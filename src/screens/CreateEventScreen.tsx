import { useEffect, useState } from "react";
import DatePicker from "../components/calendar/DayPicker";
import Label from "../components/calendar/Label";
import TimeSelections from "../components/calendar/TimeSelections";
import dayjs from "dayjs";

export default function CreateEventScreen() {
    // Use a 1d array of size 7, where 0 = not selected, 1 = selected
    // store id and index into array to change it, keep state this way.
    // days go from sunday (i=0) -> saturday (i=6)
    const [selectedDays, setSelectedDays] = useState([0, 0, 0, 0, 0, 0, 0]);

    const [startTime, setStartTime] = useState(dayjs().hour(9)); // Default to 9 AM
    const [endTime, setEndTime] = useState(dayjs().hour(17)); // Default to 5 PM

    const [groupName, setGroupName] = useState("Set a Group Name Here!");

    return (
        <div className="flex w-full h-full">
            <div className="flex flex-col w-1/3 h-full justify-center">
                <div>
                    <h4 className="mb-10">
                        Select the dates that you want to make a schedule for!
                    </h4>
                    <Label />
                    <DatePicker
                        selectedDays={selectedDays}
                        setSelectedDays={setSelectedDays}
                    />
                </div>
            </div>
            <div className="w-1/3 h-full justify-center">
                <div className="mt-10">
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => {
                            setGroupName(e.target.value);
                        }}
                        className="text-center bg-white text-black"
                    />
                </div>
            </div>
            <div className="w-1/3">
                <TimeSelections startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}/>
            </div>
        </div>
    );
}
