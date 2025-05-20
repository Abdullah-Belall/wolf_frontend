export default function MainTable({
  title,
  children,
  headers,
}: {
  title: string;
  headers: string[];
  children: React.ReactNode;
}) {
  const header = headers.map((e, i) => (
    <th key={i} className="px-4 py-3 text-center sticky">
      {e}
    </th>
  ));
  return (
    <div>
      <h1 className="mb-[15px] ml-auto w-fit text-lg font-semibold text-myDark">{title}</h1>
      <div dir="ltr" className="overflow-x-auto">
        <div className="rounded-xl border border-mdLight overflow-hidden">
          <table className="w-full text-right border-collapse bg-myHover text-secDark">
            <thead className="sticky">
              <tr className="bg-myHover text-sm text-secDark">{header}</tr>
            </thead>
            <tbody className="text-sm divide-y divide-mdLight">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
