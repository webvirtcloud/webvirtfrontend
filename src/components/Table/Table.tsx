import tw from 'twin.macro';

export default function Table({ data, columns }) {
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
    <div css={tw`overflow-x-auto border rounded-md`}>
      <table css={tw`w-full text-left`}>
        <thead css={tw`border-b bg-alt text-xs`}>
          <tr>
            {columns.map((column) => (
              <th
                css={tw`select-none whitespace-nowrap bg-alt px-4 py-3`}
                key={column.field}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody css={tw`divide-y`}>
          {data.map((item, i) => (
            <tr key={i} css={tw`bg-white hover:bg-stripe transition-colors`}>
              {columns.map((column) => (
                <td css={tw`px-4 py-2 whitespace-nowrap`} key={column.field}>
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
