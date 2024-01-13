import { useState } from "react";
import inverse from "../../helpers/inverse";

export default function Day({
    name,
    setSelectedDays,
}: {
    name: string;
    setSelectedDays: any;
}) {
    const [active, setActive] = useState(0);

    const dayName = name;

    function handleOnClick() {
        setSelectedDays((prevSelected: Map<string, any>) => {
            prevSelected.set(dayName, inverse(prevSelected.get(dayName)));
            setActive(prevSelected.get(dayName));
            return prevSelected;
        });
    }

    return (
        <div
            className={`${active === 1 ? 'bg-green-300' : 'bg-red-300'} w-6 h-24 border border-style:solid hover:cursor-pointer`}
            onClick={handleOnClick}
        />
    );
}
