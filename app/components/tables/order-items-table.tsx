"use client";
import { useEffect, useState } from "react";
import OrderItemsTableRow from "../orders/order-items-row";
import MainTable from "./main-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_ITEMS_REQ,
  MAKE_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import NoData from "../common/no-data";
import { Button } from "@mui/material";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useReturns } from "@/app/utils/contexts/returns-contexts";

export default function OrderItemsTable({
  title,
  id,
  refetchOrders,
}: {
  title: string;
  id: string;
  refetchOrders: any;
}) {
  const router = useRouter();
  const [data, setData] = useState<any>([]);
  const { openPopup } = usePopup();
  const { returns, setReturns, closeReturns } = useReturns();
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
  const onConfirmReturns = async () => {
    if (!returns?.data || returns?.data?.length === 0) {
      openPopup("snakeBarPopup", {
        message: "يجب تحديد الكمية المراد ارجاعها من كل صنف للمتابعة.",
      });
      return;
    }
    for (const item of returns?.data) {
      const response = await CLIENT_COLLECTOR_REQ(MAKE_RETURNS_REQ, {
        id: item.id,
        data: { qty: item.qty },
      });
      if (!response.done) {
        openPopup("snakeBarPopup", {
          message: response.message,
        });
        return;
      }
    }
    closeReturns();
    openPopup("snakeBarPopup", {
      message: "تم تنفيذ المرتجع بنجاح.",
      type: "success",
    });
    fetchData();
    refetchOrders();
  };
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
            id={row.id}
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
      <div className="!absolute !left-[18px] !top-[13px] flex gap-1">
        <Button
          onClick={() => {
            returns?.isActive ? closeReturns() : setReturns({ isActive: true, data: [] });
          }}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {returns?.isActive ? "الغاء" : "انشاء مرتجع"}
        </Button>
        {returns?.isActive && (
          <Button
            onClick={onConfirmReturns}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            تأكيد
          </Button>
        )}
      </div>
    </>
  );
}
