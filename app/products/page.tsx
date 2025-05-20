"use client";
import { useEffect, useState } from "react";
import ProductsTable from "../components/tables/products-table";
import { CLIENT_COLLECTOR_REQ, GET_ALL_PRODUCTS_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_PRODUCTS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data.products);
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
        <ProductsTable title={"كل المنتجات"} data={data} cat={"الفئة"} refetch={fetchData} />
      </div>
    </>
  );
}
