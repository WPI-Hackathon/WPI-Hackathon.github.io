import { GroupData } from "../screens/ProfileScreen"
type GroupProps = {
  group: GroupData
}
export default function Group({ group }: GroupProps) {
  return (
    <p className="text-lg font-semibold">{group.name}</p>

  )
}
