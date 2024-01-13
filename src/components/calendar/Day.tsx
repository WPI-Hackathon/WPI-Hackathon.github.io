import { useState } from "react";
import inverse from "../../helpers/inverse";

export default function Day({
    name,
    startingActive,
    setSelectedDays,
    cellNum,
}: {
    name: string;
    startingActive: number;
    setSelectedDays: any;
    cellNum: number;
}) {
    const [active, setActive] = useState(startingActive)

    function handleOnClick() {

        setSelectedDays((prevSelected: Array<number>) => {
            let inv = prevSelected[cellNum];
            inv = inverse(inv);
            prevSelected[cellNum] = inv
            setActive(prevSelected[cellNum])
            console.log(prevSelected)
            return prevSelected;
        });
    }

    return (
        <div
            className={`${
                active === 1 ? "bg-green-300" : "bg-red-300"
            } w-6 h-24 border border-style:solid hover:cursor-pointer`}
            onClick={handleOnClick}
        />
    );
}
