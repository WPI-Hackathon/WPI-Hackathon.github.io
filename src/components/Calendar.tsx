import { useState, useEffect } from "react";
import { displaySchedule } from "./helpers/displaySchedule";
import calcArea from "./helpers/calcArea";

export default function Calendar({
    parseSchedule,
}: {
    parseSchedule: number[][];
}) {
    const [schedule, setSchedule] =
        useState<Array<Array<number>>>(parseSchedule);
    const [mouse, setMouse] = useState<boolean>(false);
    const [mode, setMode] = useState(0);
    const [start, setStart] = useState<number>(-1);
    const [current, setCurrent] = useState<number>(-1);

    useEffect(() => {
        const saveData = setTimeout(() => {
            console.log("Saving...");
            console.log(schedule);
        }, 2000);

        return () => clearTimeout(saveData);
    }, [schedule]);

    useEffect(() => {
        setSchedule((prevSchedule: number[][]) => {
            prevSchedule = calcArea(prevSchedule, schedule[0].length, start, current)
            return [...prevSchedule]
        })
    }, [start, current])

    console.log("CURRENT", current)

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
    }

    return (
        <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {display}
            <div>{`${schedule}`}</div>
        </div>
    );
}
