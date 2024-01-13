import { useEffect, useState } from "react";
import getCoords from "../../helpers/getCoords";
import inverse from "../../helpers/inverse";

export default function Cell({
    schedule,
    setSchedule,
    cellNum,
    height,
    mouse,
    mode,
    setMode,
    setStart,
    setCurrent,
}: {
    schedule: number[][];
    setSchedule: any;
    cellNum: number;
    height: number;
    mouse: boolean;
    mode: number;
    setMode: any;
    setStart: any;
    setCurrent: any;
}) {
    // TODO: Replace starting state if loading calendar
    // TODO: useEffect handling the fetching of the data from firebase
    const [active, setActive] = useState(() => {
        const { x, y } = getCoords(height, cellNum);
        return schedule[x][y];
    });

    const [previousVal, setPreviousValue] = useState(0);


    useEffect(() => {
        setPreviousValue(active);
        setActive(() => {
            const { x, y } = getCoords(height, cellNum);
            return schedule[x][y];
        });
    }, [schedule]);

    function handleOnMouseEnter() {
        if (mouse) {
            setCurrent(cellNum);
        }
    }

    function handleOnMouseLeave() {
        // Don't set current instead revert the number (might not even need this)
        if (mouse) {
            setActive(previousVal);
        }
    }

    function handleOnMouseDown() {
        console.log('mouse down')
        setMode(inverse(active));
        setStart(cellNum);
        setCurrent(cellNum);
    }

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
