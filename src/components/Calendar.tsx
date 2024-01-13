import { useState, useEffect } from "react";
import { initSchedule } from "./helpers/initSchedule";

export default function Calendar({
    parseSchedule,
}: {
    parseSchedule: number[][];
}) {
    const [schedule, setSchedule] =
        useState<Array<Array<number>>>(parseSchedule);

    useEffect(() => {
        console.log("INSDKFHS:DKLFHJSDKLFJHSDKLFJH")
        console.log(schedule);
    }, [schedule]);

    const test = initSchedule(schedule, setSchedule);

    return (
        <>
            {test}
            {schedule}
        </>
    );
}
