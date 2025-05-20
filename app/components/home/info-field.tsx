export default function InfoField({ title, total }: { title: string; total: number }) {
  const formattedTotal = total.toLocaleString();

  return (
    <div className="flex flex-col items-end bg-myHover border border-mdLight rounded-md w-full px-[15px] py-[30px] shadow-md">
      <h1 className="font-semibold">{formattedTotal}</h1>
      {title}
    </div>
  );
}
