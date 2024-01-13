import getCoords from "./getCoords";

export default function modifySchedule(
    schedule: number[][],
    cellNum: number,
    height: number
) {
    const { x, y } = getCoords(height, cellNum);
    schedule[x][y] = (schedule[x][y] + 1) % 2;
    return schedule;
}
