"use client";
import BlackLayer from "@/app/components/common/black-layer";
import PopupHolder from "@/app/components/common/popup-holder";
import AllSortsTable from "@/app/components/tables/all-sorts-table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddOrderForm from "@/app/components/forms & alerts/add-order-form";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_COSTS_REQ,
  GET_ALL_SORTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { SortInterface } from "@/app/utils/types/interfaces";
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
