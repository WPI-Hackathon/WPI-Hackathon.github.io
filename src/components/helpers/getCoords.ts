export default function getCoords(height: number, cellNum: number) {
    const x = Math.floor(cellNum / height);
    const y = cellNum % height;
    return {x, y}
};
