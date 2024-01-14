import { GroupData } from "../screens/ProfileScreen"
type GroupProps = {
  group: GroupData
}
export default function Group({ group }: GroupProps) {
  return (
    <div key={group.name} className="border-solid border-2 p-2 mb-6" style={{ width: "70%" }}>
      <div className="flex justify-center items-center flex-col">
        <p className="text-lg font-semibold">{group.name}</p>
      </div>
    </div>

  )
}
