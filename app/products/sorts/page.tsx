"use client";
import BlackLayer from "@/app/components/common/black-layer";
import PopupHolder from "@/app/components/common/popup-holder";
import AllSortsTable from "@/app/components/tables/all-sorts-table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddOrderForm from "@/app/components/forms & alerts/add-order-form";
import { CLIENT_COLLECTOR_REQ, GET_ALL_SORTS_REQ } from "@/app/utils/requests/client-side.requests";
import { SortInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";

export default function Sorts() {
  const router = useRouter();
  const { popupState, closeOrderPopup } = usePopup();
  const [openOrder, setOpenOrder] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response: { done: boolean; data: { sorts: SortInterface[] } } =
      await CLIENT_COLLECTOR_REQ(GET_ALL_SORTS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data.sorts as any);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onAdded = () => {
    setOpenOrder(false);
    closeOrderPopup("makeOrderPopup");
    fetchData();
  };
  return (
    <>
      <div className="px-mainxs relative">
        <AllSortsTable data={data} />
        {popupState.makeOrderPopup.isOpen && (
          <div className="!absolute left-[12px] top-[-5px] flex gap-2 items-center">
            <Button
              onClick={() => setOpenOrder(true)}
              sx={{ fontFamily: "cairo" }}
              className="bg-mdDark!"
              variant="contained"
            >
              انشاء طلب
            </Button>
            <div
              dir="rtl"
              className="font-semibold bg-transparent text-mdDark border-2 border-mdDark text-md px-3 rounded-md"
            >
              {popupState.makeOrderPopup.data.product_sorts.length}{" "}
              {popupState.makeOrderPopup.data.product_sorts.length > 2 ? "اصناف" : "صنف"}
            </div>
          </div>
        )}
      </div>
      {openOrder && (
        <>
          <BlackLayer onClick={() => setOpenOrder(false)} />
          <PopupHolder>
            <AddOrderForm onAdded={onAdded} />
          </PopupHolder>
        </>
      )}
    </>
  );
}
