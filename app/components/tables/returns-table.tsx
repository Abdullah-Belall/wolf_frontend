"use client";
import { ReturnedItemInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import ReturnsTableRows from "../orders/return-table-rows";

export default function ReturnsTable({ data }: { data: ReturnedItemInterface[] }) {
  return (
    <>
      <MainTable
        title="المرتجعات"
        headers={[
          "التاريخ",
          "فاتورة المرتجع",
          "سعر الوحدة وقت الشراء",
          "الكمية المرتجعه",
          "الحجم",
          "اللون",
          "الصنف",
          "المنتج",
          "العميل",
          "*",
        ]}
      >
        {data.map((row, index) => (
          <ReturnsTableRows
            key={index}
            id={row?.id}
            qty={row?.qty}
            reason={row?.reason}
            created_at={row?.created_at}
            updated_at={row?.updated_at}
            order_item={row.order_item}
          />
        ))}
      </MainTable>
      {data.length === 0 && <NoData />}
    </>
  );
}
