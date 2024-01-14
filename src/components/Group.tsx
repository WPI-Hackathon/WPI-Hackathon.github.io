export default function Group({ group }: any) {
  return (
    <div>
      <p className="text-lg font-semibold">{group.name}</p>
      <p className="text-xs font-semibold">{group.id}</p>
    </div>
  )
}
