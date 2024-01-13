import { GroupData } from "../screens/ProfileScreen"
type GroupProps = {
  group_data: GroupData
}
export default function Group({ group_data }: GroupProps) {
  return (
    <div>
      <div>{group_data.name}</div>
      <div>{group_data.members.map((member) => ` ${member}`)}</div>
    </div>
  )
}
