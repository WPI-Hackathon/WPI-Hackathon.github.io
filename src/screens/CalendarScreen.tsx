import Calendar from "../components/calendar/Calendar";

function create2DCalendarArray() {
    
    return Array.from({
        // generate array of length m
        length: 7
        // inside map function generate array of size n
        // and fill it with `0`
      }, () => new Array(48).fill(0));
}

export default function CalendarScreen() {
    

    return (
        <div className="flex flex-col items-center justify-center">
            <Calendar parseSchedule={create2DCalendarArray()} />
        </div>
    );
}
