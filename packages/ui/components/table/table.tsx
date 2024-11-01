export function Table({ data, columns }) {
  function CellRenderer(item, column) {
    if (column.component) {
      return <column.component value={item} />;
    }
    if (column.formatter) {
      return column.formatter(item);
    }

    return item[column.field];
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-muted-foreground text-xs">
          <tr>
            {columns.map((column) => (
              <th
                className="bg-muted text-muted-foreground select-none whitespace-nowrap px-4 py-3 first:rounded-l-lg last:rounded-r-lg"
                key={column.field}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-neutral-700">
          {data.map((item, i) => (
            <tr key={i} className="">
              {columns.map((column) => (
                <td className="whitespace-nowrap px-4 py-2" key={column.field}>
                  {CellRenderer(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
