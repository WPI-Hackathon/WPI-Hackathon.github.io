import getCoords from "./getCoords";
import inverse from "./inverse";

export default function calcArea(
    schedule: number[][],
    height: number,
    start: number,
    current: number
) {
    const { x: x1, y: y1 } = getCoords(height, start);
    const { x: x2, y: y2 } = getCoords(height, current);

    const max = [Math.max(x1, x2), Math.max(y1, y2)];
    const min = [Math.min(x1, x2), Math.min(y1, y2)];
    
    for(let i = min[0]; i < max[0]; i++) {
        for(let j = min[1]; j < max[1]; j++) {
            schedule[i][j] = inverse(schedule[i][j])
        }
    }
    
    return schedule;
}
