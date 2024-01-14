import { useState, useEffect } from "react";
import { displaySchedule } from "../../helpers/displaySchedule";
import calcArea from "../../helpers/calcArea";
import CalendarHeader from "./CalendarHeader";

export default function Calendar({ parseSchedule }: { parseSchedule: any }) {
    const [schedule, setSchedule] =
        useState<Array<Array<number>>>(parseSchedule);
    const [mouse, setMouse] = useState<boolean>(false);
    const [mode, setMode] = useState(0);
    const [start, setStart] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const saveData = setTimeout(() => {
            console.log("Saving...");
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

        </div>
    );
}
