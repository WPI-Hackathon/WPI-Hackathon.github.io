import Day from "../components/calendar/Day";

const allDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getWeekMap() {
  let map = new Map<string, number>();

  allDays.map((dayName) => {
    map.set(dayName, 0);
  });

  return map;
}

export function createWeek(setSelectedDays: any) {
  return (
    <>
      {allDays.map((_, i) => (
        <Day setSelectedDays={setSelectedDays} key={i} startingActive={0} cellNum={0} />
      ))}
    </>
  );
}
