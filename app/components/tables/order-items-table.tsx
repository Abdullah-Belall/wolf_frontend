"use client";
import { useEffect, useState } from "react";
import OrderItemsTableRow from "../orders/order-items-row";
import MainTable from "./main-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_ITEMS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import NoData from "../common/no-data";

export default function OrderItemsTable({ title, id }: { title: string; id: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ORDER_ITEMS_REQ, { id });
    if (response.done) {
      setData(response.data.order_items);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <MainTable
        title={title}
        headers={["الفاتورة", "سعر الوحدة", "الكمية", "اللون", "المقاس", "الصنف", "المنتج", "*"]}
      >
        {data.map((row: any, index: number) => (
          <OrderItemsTableRow
            key={index}
            index={index + 1}
            product={row?.sort?.product}
            name={row?.sort.name}
            size={row?.sort.size}
            color={row?.sort.color === "" || !row.color ? null : "لا يوجد"}
            qty={row.qty}
            unit_price={+row.unit_price}
          />
        ))}
      </MainTable>
      {data.length === 0 && <NoData />}
    </>
  );
}
