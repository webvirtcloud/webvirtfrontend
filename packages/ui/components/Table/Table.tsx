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
        <thead className="text-xs text-neutral-500">
          <tr>
            {columns.map((column) => (
              <th
                className="select-none whitespace-nowrap bg-neutral-100 px-4 py-3 text-neutral-500 first:rounded-l-lg last:rounded-r-lg dark:bg-neutral-800 dark:text-neutral-500"
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
