"use client";
import { CostsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import CostsTableRows from "../products/costs-table-rows";
import NoData from "../common/no-data";

export default function CostsTable({ data }: { data: CostsInterface[] }) {
  return (
    <>
      <MainTable
        title="البضاعة المدخلة"
        headers={[
          "التاريخ",
          "الاجمالي",
          "سعر الوحدة",
          "الكمية المدخلة",
          "المقاس",
          "اللون",
          "اسم الصنف",
          "اسم المنتج",
          "*",
        ]}
      >
        {data.map((row, index) => (
          <CostsTableRows
            key={index}
            id={row.id}
            index={index + 1}
            sort={row.sort}
            qty={row.qty}
            price={row.price}
            created_at={row.created_at}
          />
        ))}
      </MainTable>
      {data.length === 0 && <NoData />}
    </>
  );
}
