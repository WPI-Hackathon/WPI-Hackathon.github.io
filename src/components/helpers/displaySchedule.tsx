import Cell from "../calendar/Cell";

export function displaySchedule(schedule: number[][], setSchedule: any, mouse: boolean) {
    let key = 0;

    return (
        <div className="flex flex-row">
            {schedule.map((week) => (
                <div className="flex-auto w-auto">
                    {week.map((day) => {
                        key++;
                        return (
                            <Cell
                                schedule={schedule}
                                setSchedule={setSchedule}
                                cellNum={key - 1}
                                height={schedule[0].length}
                                mouse={mouse}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
