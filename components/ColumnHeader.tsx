export default function ColumnHeader(props: {
  title: string;
}) {
  return (
    <div className="
      column-header
      flex flex-col items-center p-[0.05em] border-[0.1em]
    ">
      <div className="
        text-sm
        flex flex-col w-40 p-0 text-center
      ">
        { props.title }
      </div>
    </div>
  )
}
