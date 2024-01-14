import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export default function TimeSelections({
    startTime,
    setStartTime,
    endTime,
    setEndTime,
}: {
    startTime: Dayjs;
    setStartTime: Function;
    endTime: Dayjs;
    setEndTime: Function;
}) {
    return (

            <TimePicker
                label="Not Before"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
            />

    );
}
