import Calendar from "../components/calendar/Calendar";

export default function CalendarScreen() {
    const apiCall = [
        [0, 1, 1, 0],
        [1, 1, 0, 1],
    ];

    return <Calendar parseSchedule={apiCall} />;
}
