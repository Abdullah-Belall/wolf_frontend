"use client";
import { useEffect, useState } from "react";
import UsersTable from "../components/tables/users-table";
import { CLIENT_COLLECTOR_REQ, GET_ALL_CLIENTS_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";

export default function Clients() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_CLIENTS_REQ);
    if (response.done) {
      setData(response.data.clients);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-mainxs">
      <UsersTable type={"client"} data={data} />
    </div>
  );
}
