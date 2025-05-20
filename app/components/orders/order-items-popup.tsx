"use client";
import OrderItemsTable from "../tables/order-items-table";

export default function OrderItemsPopUp({ id, index }: { id: string; index: number }) {
  return (
    <div className="rounded-md shadow-md min-w-[520px] bg-myLight p-mainxl">
      <OrderItemsTable title={`منتجات الطلب رقم ${index}`} id={id} />
    </div>
  );
}
