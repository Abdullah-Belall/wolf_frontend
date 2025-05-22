"use client";
import { useEffect, useState } from "react";
import OrdersTable from "../components/tables/orders-table";
import { CLIENT_COLLECTOR_REQ, GET_ALL_ORDERS_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";

export default function Orders() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_ORDERS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data.orders);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-mainxs">
        <OrdersTable data={data} tableFor="overview" title="كل الطلبات" refetch={fetchData} />
      </div>
    </>
  );
}
