import Day from "./Day";

const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function DayPicker({
    selectedDays,
    setSelectedDays,
}: {
    selectedDays: Array<number>;
    setSelectedDays: any;
}) {
    return (
        <div className="flex flex-row">
            {selectedDays.map((value, index) => {
                console.log(index);
                return (
                    <Day
                        name={allDays[index]}
                        startingActive={value}
                        setSelectedDays={setSelectedDays}
                        cellNum={index}
                        key={index}
                    />
                );
            })}
        </div>
    );
}
