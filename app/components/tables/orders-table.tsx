import { usePopup } from "@/app/utils/contexts/popup-contexts";
import OrdersTableRow from "../orders/orders-table-row";
import MainTable from "./main-table";
import BlackLayer from "../common/black-layer";
import PopupHolder from "../common/popup-holder";
import OrderItemsPopUp from "../orders/order-items-popup";
import { OrderInterface } from "@/app/utils/types/interfaces";

export default function OrdersTable({
  title,
  tableFor,
  data,
}: {
  title: string;
  tableFor: "client" | "overview";
  data: OrderInterface[];
}) {
  const { closePopup, popupState } = usePopup();
  const headers = [
    "التاريخ",
    "حالة الدفع",
    "طريقة الدفع",
    "الفاتورة بعد الضريبة والخصم",
    "الخصم",
    "ضريبة القيمة المضافة",
    "الفاتورة",
    "الطلبات",
    "العميل",
    "*",
  ];
  if (tableFor === "client") {
    headers.splice(5, 1);
  }
  const paymentMethodSlug = (method: string) => {
    return paymentMethodsSlug.find((e) => e.name === method)?.slug;
  };
  const paymentStatusSlug = (status: string) => {
    return paymentStatusesSlug.find((e) => e.name === status)?.slug;
  };
  return (
    <>
      <MainTable title={title} headers={headers}>
        {data?.map((row, index) => (
          <OrdersTableRow
            key={index}
            id={row.id}
            client={{ client_id: row?.client?.id, name: row?.client?.user_name }}
            index={index + 1}
            earnig={+row.total_price}
            payment_method={paymentMethodSlug(row.payment.payment_method) as string}
            payment_status={paymentStatusSlug(row.payment.status) as string}
            date={row.created_at}
            tableFor={tableFor}
            tax={row.tax}
            discount={row.discount}
          />
        ))}
      </MainTable>
      {popupState.ordersPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("ordersPopup")} />
          <PopupHolder>
            <OrderItemsPopUp
              index={popupState.ordersPopup.data.index}
              id={popupState.ordersPopup.data.id}
            />
          </PopupHolder>
        </>
      )}
    </>
  );
}

const paymentMethodsSlug = [
  { name: "bank_transfer", slug: "تحويل بنكي" },
  { name: "vf_cash", slug: "فودافون كاش" },
  { name: "cash", slug: "كاش" },
];
const paymentStatusesSlug = [
  { name: "paid", slug: "مدفوع" },
  { name: "pending", slug: "غير مدفوع" },
];
