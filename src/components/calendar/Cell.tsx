import { useEffect, useRef, useState } from "react";
import modifySchedule from "../helpers/modifySchedule";
import getCoords from "../helpers/getCoords";
import inverse from "../helpers/inverse";

export default function Cell({
    schedule,
    setSchedule,
    cellNum,
    height,
    mouse,
    mode,
    setMode,
}: {
    schedule: number[][];
    setSchedule: any;
    cellNum: number;
    height: number;
    mouse: boolean;
    mode: number;
    setMode: any;
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

    function handleOnMouseEnter() {
        if (mouse) {
            setSchedule((prevSchedule: number[][]) => {
                const { x, y } = getCoords(height, cellNum);
                prevSchedule[x][y] = mode;
                return [...prevSchedule];
            });
        }
    }

    function handleOnMouseLeave() {
        if (mouse) {
            setSchedule((prevSchedule: number[][]) => {
                const { x, y } = getCoords(height, cellNum);
                prevSchedule[x][y] = mode;
                return [...prevSchedule];
            });
        }
    }

    function handleOnMouseDown() {
        const inv = inverse(active);
        setMode(inv);
        setSchedule((prevSchedule: number[][]) => {
            const { x, y } = getCoords(height, cellNum);
            prevSchedule[x][y] = inv;
            return [...prevSchedule];
        });
    }

    console.log("mode is now:", mode);

    return (
        <div
            className={`${
                active === 1 ? "bg-green-300" : "bg-red-300"
            } w-24 h-6 border border-style:solid`}
            onMouseEnter={handleOnMouseEnter}
            onMouseDown={handleOnMouseDown}
            onMouseLeave={handleOnMouseLeave}
        />
    );
}
