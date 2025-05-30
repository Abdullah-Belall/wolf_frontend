"use client";
import { ReturnDataInterface, ReturnsItemsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import ReturnsTableRows from "../orders/return-table-rows";

export default function ReturnsTable({
  data,
  title,
}: {
  data: ReturnDataInterface;
  title: string;
}) {
  const calcTotalPrice = (returnsItems: ReturnsItemsInterface[]) => {
    return returnsItems.reduce((acc, curr) => acc + Number(curr.qty) * Number(curr.unit_price), 0);
  };
  return (
    <>
      <MainTable
        title={title}
        headers={[
          "التاريخ",
          "فاتورة المرتجع",
          "عمليات المرتجع",
          "رقم المبيعات",
          "العميل",
          "عناصر المرتجع",
          "*",
        ]}
      >
        {data?.returns_items?.map((row: any, index) => (
          <ReturnsTableRows
            key={index}
            id={row?.id}
            order={row?.order}
            totalPrice={calcTotalPrice(row?.returns_items)}
            returns_items_count={row?.returns_items_count}
            created_at={row?.created_at}
            updated_at={row?.updated_at}
            short_id={row.short_id}
          />
        ))}
      </MainTable>
      {data?.returns_items?.length === 0 && <NoData />}
    </>
  );
}
