import Day from "./Day";

export default function DayPicker({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: Array<number>;
  setSelectedDays: any;
}) {


  return (
    <div className="flex flex-row justify-center">
      {selectedDays.map((value, index) => {
        console.log(index);
        return (
          <Day
            startingActive={value}
            setSelectedDays={setSelectedDays}
            cellNum={index}
            key={index}
          />
        );
      })}
    </div>
  );
}
