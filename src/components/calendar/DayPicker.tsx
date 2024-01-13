import { useEffect, useState } from "react";
import { createWeek, getWeekMap } from "../../helpers/createWeek";

export default function DayPicker() {
    const [selectedDays, setSelectedDays] = useState(getWeekMap());

    const week = createWeek(setSelectedDays);

    return <div className="flex flex-row">{week}</div>;
}
