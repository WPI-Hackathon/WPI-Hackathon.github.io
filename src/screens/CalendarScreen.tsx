import Calendar from "../components/calendar/Calendar";

export default function CalendarScreen() {
    const apiCall = [
        [0, 1, 1, 0],
        [1, 1, 0, 1],
    ];

    return (
        <div className="flex flex-col items-center justify-center pt-48">
            <Calendar parseSchedule={apiCall} />
        </div>
    );
}
