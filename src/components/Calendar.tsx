import { useState, useEffect } from "react";
import { displaySchedule } from "./helpers/displaySchedule";

export default function Calendar({
    parseSchedule,
}: {
    parseSchedule: number[][];
}) {
    const [schedule, setSchedule] =
        useState<Array<Array<number>>>(parseSchedule);
    const [mouse, setMouse] = useState<boolean>(false);
    const [mode, setMode] = useState(0);

    useEffect(() => {
        const saveData = setTimeout(() => {
            console.log("Saving...");
            console.log(schedule);
        }, 2000);

        return () => clearTimeout(saveData);
    }, [schedule]);

    const display = displaySchedule(
        schedule,
        setSchedule,
        mouse,
        mode,
        setMode
    );

    function handleMouseDown() {
        console.log("mouse down");
        setMouse(true);
    }

    function handleMouseUp() {
        console.log("mouse up");
        setMouse(false);
    }

    return (
        <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {display}
            <div>{`${schedule}`}</div>
        </div>
    );
}
