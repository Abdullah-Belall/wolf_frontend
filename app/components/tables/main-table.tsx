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
    <th key={i} className="px-4 py-3 text-center sticky top-0 bg-myHover z-10">
      {e}
    </th>
  ));

  return (
    <div>
      <h1 className="mb-[15px] ml-auto w-fit text-lg font-semibold text-myDark">{title}</h1>
      <div className="overflow-x-auto">
        <div className="custom-scrollbar max-h-[calc(100dvh-140px)] overflow-y-auto rounded-xl border border-mdLight">
          <table className="w-full text-right border-collapse bg-myHover text-secDark">
            <thead>
              <tr className="text-sm">{header}</tr>
            </thead>
            <tbody className="text-sm divide-y divide-mdLight">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
