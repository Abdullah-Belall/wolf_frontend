"use client";
import { useEffect, useState } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import ReturnsTable from "../components/tables/returns-table";

export default function Sorts() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_RETURNS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data);
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
        <ReturnsTable title={"فواتير المرتجعات"} data={data} />
      </div>
    </>
  );
}
