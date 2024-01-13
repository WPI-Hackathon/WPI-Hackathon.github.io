import { useEffect, useRef, useState } from "react";
import modifySchedule from "../../helpers/modifySchedule";
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
    setCurrent
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
   
    const [previousVal, setPreviousValue] = useState(0)

    useEffect(() => {
        setActive(() => {
            const { x, y } = getCoords(height, cellNum);
            return schedule[x][y];
        });
    }, [schedule]);

    function handleOnMouseEnter() {
        // if (mouse) {
        //     if (active !== mode) {
        //         console.log("running");
        //         setSchedule((prevSchedule: number[][]) => {
        //             const { x, y } = getCoords(height, cellNum);
        //             prevSchedule[x][y] = mode;
        //             return [...prevSchedule];
        //         });
        //     }
        // }
        if(mouse) {
            setCurrent(cellNum)
            setPreviousValue(active)
        }
    }

    function handleOnMouseLeave() {
        // if (mouse) {
        //     if (mode === active) {
        //         setSchedule((prevSchedule: number[][]) => {
        //             const { x, y } = getCoords(height, cellNum);
        //             prevSchedule[x][y] = inverse(mode);
        //             return [...prevSchedule];
        //         });
        //     }
        // }

        // Don't set current instead revert the number (might not even need this)
        setActive(previousVal)
    }

    function handleOnMouseDown() {
        // const inv = inverse(active);
        // setSchedule((prevSchedule: number[][]) => {
            //     const { x, y } = getCoords(height, cellNum);
            //     prevSchedule[x][y] = inv;
            //     return [...prevSchedule];
            // });
        setMode(inverse(active));
        setStart(cellNum)
        setCurrent(cellNum)
        console.log("SET CURRENT", cellNum)
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
