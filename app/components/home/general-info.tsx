import { CalcsInterface } from "@/app/utils/types/interfaces";
import InfoField from "./info-field";

export default function GeneralInfo({ data }: { data: CalcsInterface }) {
  return (
    <section className="w-full flex flex-col items-end">
      <h1 className="font-bold mb-[15px]">التحاليل العامة</h1>
      <div dir="rtl" className="w-full flex flex-wrap gap-[10px] justify-center items-center">
        <InfoField title={"عدد الفواتير المدفوعة"} total={data?.countPaidOrders} uom={`فاتورة`} />
        <InfoField title={"ارباح الفواتير المدفوعة"} total={data?.paidOrders} uom={`ج.م`} />
        <InfoField
          title={"عدد الفواتير الغير مدفوعة"}
          total={data?.countNotPaidOrders}
          uom={`فاتورة`}
        />
        <InfoField title={"ارباح الفواتير الاجلة"} total={data?.notPaidOrders} uom={`ج.م`} />
        <InfoField
          title={"اجمالي تكاليف بضاعة المخزون الحالية"}
          total={data?.totalCostsPrice}
          uom={`ج.م`}
        />
        <InfoField
          title={"اجمالي اسعار بضاعة المخزون الحالية"}
          total={data?.totalSortsPrices}
          uom={`ج.م`}
        />
        <InfoField title={"عدد المرتجعات"} total={data?.countTotalReturnsPrices} uom={`مرتجع`} />
        <InfoField title={"اجمالي اسعار المرتجعات"} total={data?.totalReturnsPrices} uom={`ج.م`} />
      </div>
    </section>
  );
}
