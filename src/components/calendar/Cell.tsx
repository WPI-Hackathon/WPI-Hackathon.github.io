import { useEffect, useRef, useState } from "react";
import modifySchedule from "../helpers/modifySchedule";
import getCoords from "../helpers/getCoords";

export default function Cell({
    schedule,
    setSchedule,
    cellNum,
    height,
    mouse
}: {
    schedule: number[][];
    setSchedule: any;
    cellNum: number;
    height: number;
    mouse: boolean;
}) {
    // TODO: Replace starting state if loading calendar
    // TODO: useEffect handling the fetching of the data from firebase
    const [active, setActive] = useState(() => {
        const { x, y } = getCoords(height, cellNum);
        return schedule[x][y];
    });

    useEffect(() => {
        setActive(() => {
            const { x, y } = getCoords(height, cellNum);
            return schedule[x][y];
        });
    }, [schedule]);

    function handleClick() {
        setSchedule((prevSchedule: number[][]) => {
            const newSchedule = modifySchedule(prevSchedule, cellNum, height);
            return [...newSchedule];
        });
    }

    function handleOnMouseEnter() {
        if(mouse) {
            console.log("wow its working")
            setSchedule((prevSchedule: number[][]) => {
                const newSchedule = modifySchedule(prevSchedule, cellNum, height);
                return [...newSchedule];
            });
        }
    }

    return (
        <div
            className={`${
                active === 1 ? "bg-green-300" : "bg-red-300"
            } w-24 h-6 border border-style:solid`}
            onClick={handleClick}
            onDragOver={handleClick}
            onMouseEnter={handleOnMouseEnter}
        />
    );
}
