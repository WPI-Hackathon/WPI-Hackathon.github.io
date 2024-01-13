import Day from "../components/calendar/Day";

const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export function getWeekMap() {
    let map = new Map<string, number>() ;

    allDays.map((dayName) => {
        map.set(dayName, 0);
    });

    return map;
}

export function createWeek(setSelectedDays: any) {
    return (
        <>
            {allDays.map((dayName, i) => (
                <Day name={dayName} setSelectedDays={setSelectedDays} key={i} />
            ))}
        </>
    );
}
