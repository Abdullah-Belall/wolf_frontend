"use client";
import { useEffect, useState } from "react";
import ReturnsTable from "../tables/returns-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";

export default function ReturnsPopUp({ index, id }: { index: number | string; id: string }) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ORDER_RETURNS_REQ, { id });
    if (response.done) {
      setData(response.data.returns);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <ReturnsTable title={`مرتجعات الطلب رقم ${index}`} data={data} />;
}
