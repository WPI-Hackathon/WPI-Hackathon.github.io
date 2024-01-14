import { useState, useEffect } from "react";
import { displaySchedule } from "../../helpers/displaySchedule";
import calcArea from "../../helpers/calcArea";

export default function Calendar({
    parseSchedule,
}: {
    parseSchedule: number[][];
}) {
    const [schedule, setSchedule] =
        useState<Array<Array<number>>>(parseSchedule);
    const [mouse, setMouse] = useState<boolean>(false);
    const [mode, setMode] = useState(0);
    const [start, setStart] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const saveData = setTimeout(() => {
            console.log("Saving...");
            // TODO: Put firebase here
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
        <div
            className="flex flex-col"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {display}
            <div>{`${schedule}`}</div>
        </div>
    );
}
