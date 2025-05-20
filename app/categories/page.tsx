"use client";
import { Button } from "@mui/material";
import CategoriesTable from "../components/tables/categories-table";
import BlackLayer from "../components/common/black-layer";
import AddCategoryForm from "../components/forms & alerts/add-category-form";
import PopupHolder from "../components/common/popup-holder";
import { useEffect, useState } from "react";
import { CLIENT_COLLECTOR_REQ, GET_CATEGORIES_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { usePopup } from "../utils/contexts/popup-contexts";

export default function Categories() {
  const [addCat, setCat] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { openPopup } = usePopup();

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CATEGORIES_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data.categories);
      setCat(false);
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
        <CategoriesTable data={data} refetch={fetchData} />
        <Button
          onClick={() => setCat(true)}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0"
          variant="contained"
        >
          انشاء فئة
        </Button>
      </div>
      {addCat && (
        <>
          <BlackLayer onClick={() => setCat(false)} />
          <PopupHolder>
            <AddCategoryForm
              onCategoryAdded={() => {
                openPopup("snakeBarPopup", {
                  message: "تم انشاء فئة جديدة بنجاح.",
                  type: "success",
                });
                fetchData();
              }}
            />
          </PopupHolder>
        </>
      )}
    </>
  );
}
