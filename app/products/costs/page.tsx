"use client";
import { useEffect, useState } from "react";
import { CLIENT_COLLECTOR_REQ, GET_ALL_COSTS_REQ } from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import CostsTable from "@/app/components/tables/costs-table";

export default function Sorts() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_COSTS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data.costs);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-mainxs relative">
        <CostsTable data={data} />
      </div>
    </>
  );
}
