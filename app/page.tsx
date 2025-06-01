"use client";
import { useEffect, useState } from "react";
import GeneralInfo from "./components/home/general-info";
import HomeTable from "./components/tables/home-table";
import { CLIENT_COLLECTOR_REQ, GET_CALCS_REQ } from "./utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { CalcsInterface } from "./utils/types/interfaces";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<CalcsInterface>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CALCS_REQ);
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
    <div className="flex flex-col gap-[40px] px-mainxs mt-[20px]">
      <GeneralInfo data={data as CalcsInterface} />
      {/* <GeneralInfo
        title={"النتائج العامة لهذا العام"}
        clients={80}
        returned={66}
        sold={761}
        total={250000}
      /> */}
      <HomeTable />{" "}
    </div>
  );
}
