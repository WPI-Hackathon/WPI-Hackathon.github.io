import getCoords from "./getCoords";
import inverse from "./inverse";

export default function modifySchedule(
    schedule: number[][],
    cellNum: number,
    height: number
) {
    const { x, y } = getCoords(height, cellNum);
    schedule[x][y] = inverse(schedule[x][y]);

    return schedule;
}
