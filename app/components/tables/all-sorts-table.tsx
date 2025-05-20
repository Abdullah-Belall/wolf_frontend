"use client";
import AllSortsTableRows from "../products/all-sorts-rows";
import MainTable from "./main-table";
import { SortInterface } from "@/app/utils/types/interfaces";

export default function AllSortsTable({ data }: { data: SortInterface[] }) {
  return (
    <>
      <MainTable
        title={`الفاتورة`}
        headers={[
          "التاريخ",
          "الفئة",
          "السعر",
          "الكمية",
          "المقاس",
          "الخامة",
          "اللون",
          "اسم الصنف",
          "اسم المنتج",
          "*",
        ]}
      >
        {data.map((row) => (
          <AllSortsTableRows
            key={row.id}
            id={row.id}
            name={row.name}
            color={row.color === "" || !row.color ? null : row.color}
            size={row.size}
            qty={row.qty}
            price={row.price}
            note={row.note}
            created_at={row.created_at}
            product={row.product}
          />
        ))}
      </MainTable>
    </>
  );
}

const allSorts = [
  {
    index: 1,
    id: "sort_001",
    title: "قميص رجالي كلاسيك",
    cat: "الملابس",
    material: "قطن 100%",
    color: "أبيض",
    size: "L",
    qty: 20,
    price: "250",
    orders_count: "6",
    date: "2025-05-10",
  },
  {
    index: 2,
    id: "sort_002",
    title: "بنطال جينز نسائي",
    cat: "الأزياء",
    material: "جينز",
    color: "أزرق",
    size: "M",
    qty: 15,
    price: "300",
    orders_count: "8",
    date: "2025-05-08",
  },
  {
    index: 3,
    id: "sort_003",
    title: "فستان سهرة",
    cat: "الملابس النسائية",
    material: "حرير",
    color: "أسود",
    size: "S",
    qty: 5,
    price: "500",
    orders_count: "2",
    date: "2025-05-05",
  },
];
