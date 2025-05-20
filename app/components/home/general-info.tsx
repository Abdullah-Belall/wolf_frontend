import InfoField from "./info-field";

export default function GeneralInfo({
  total,
  sold,
  returned,
  clients,
  title,
}: {
  total: number;
  sold: number;
  returned: number;
  clients: number;
  title: string;
}) {
  return (
    <section className="w-full flex flex-col items-end">
      <h1 className="font-bold mb-[15px]">{title}</h1>
      <div className="w-full flex flex-row-reverse gap-[10px] justify-center items-center">
        <InfoField title={"اجمالي الأرباح"} total={total} />
        <InfoField title={"المنتجات المباعة"} total={sold} />
        <InfoField title={"المنتجات المرتجع"} total={returned} />
        <InfoField title={"الزبائن الجدد"} total={clients} />
      </div>
    </section>
  );
}
