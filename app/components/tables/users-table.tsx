import { ClientInterface } from "@/app/utils/types/interfaces";
import UsersTableRows from "../users/users-table-rows";
import MainTable from "./main-table";

export default function UsersTable({
  type,
  forOrder,
  data,
}: {
  type: "worker" | "client";
  forOrder?: boolean;
  data: ClientInterface[];
}) {
  const headers = [
    "تاريخ الاضافة",
    // "عدد العناوين",
    "عدد جهات الاتصال",
    "عدد الطلبات المكتملة",
    "الرقم الضريبي",
    "الاسم",
    "*",
  ];
  if (type === "worker") {
    headers.splice(2, 2);
    headers.splice(1, 0, "الدور");
  }
  console.log(data);
  return (
    <MainTable title="" headers={headers}>
      {data?.map((row, index) => (
        <UsersTableRows
          key={row.id}
          isForOrder={forOrder}
          index={index + 1}
          id={row.id}
          name={row.user_name}
          tax_num={row?.tax_num}
          completed_orders={row.orders_count as number}
          date={row.created_at}
          addresses_count={row.addresses_count as number}
          phone_count={row.contacts_count as number}
          type={type}
          role={row?.role === "owner" ? "مالك" : "موظف"}
        />
      ))}
    </MainTable>
  );
}
