"use client";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import OrderPrintRows from "../orders/order-print-rows";

export default function OrderBillsTable({ data }: { data: any }) {
  return (
    <>
      <MainTable
        title={""}
        headers={[
          "التاريخ",
          "السعر",
          "الكمية",
          "الخامة",
          "المقاس",
          "اللون",
          "الصنف",
          "المنتج",
          "*",
        ]}
      >
        {data.map((row: any, index: number) => (
          <OrderPrintRows
            key={row?.id}
            index={index + 1}
            id={row?.id}
            name={row?.name}
            color={row?.color === "" || !row?.color ? null : row?.color}
            size={row?.size}
            qty={row?.qty}
            price={row?.price}
            created_at={row?.created_at}
            note={row?.note as string}
            product={row?.product}
          />
        ))}
      </MainTable>
      {data.length === 0 && <NoData />}
    </>
  );
}
