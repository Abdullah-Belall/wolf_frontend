"use client";
import { formatDate, methodsArray, paidStatusArray } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

export default function OrdersTableRow({
  earning,
  payment_method,
  payment_status,
  date,
  tableFor,
  id,
  index,
  tax,
  discount,
  client: { client_id, name },
}: {
  index: number;
  id: string;
  earning: number;
  payment_method: string;
  payment_status: string;
  date: Date;
  tableFor: "client" | "overview";
  client: {
    client_id: string;
    name: string;
  };
  tax: string;
  discount: number;
}) {
  const formattedEarnig = earning.toLocaleString();
  let totalPriceAfter = earning;
  if (tax != "0") {
    totalPriceAfter = (totalPriceAfter * Number(tax)) / 100 + totalPriceAfter;
  }
  if (discount) {
    totalPriceAfter -= discount;
  }
  const { openPopup } = usePopup();
  const paymentMethodSlug = (method: string) => {
    return methodsArray.find((e) => e.value === method)?.label;
  };
  const paymentStatusSlug = (status: string) => {
    return paidStatusArray.find((e) => e.value === status)?.label;
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
            <p
              onClick={() =>
                openPopup("editOrderPopup", {
                  id,
                  tax: `${tax}%`,
                  discount,
                  earning,
                  payment_method,
                  payment_status,
                  index,
                })
              }
              className="w-fit text-xl hover:text-red-600 cursor-pointer text-anotherDark"
            >
              <CiEdit />
            </p>
          </div>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
        <td className="px-4 py-2 text-center">{paymentStatusSlug(payment_status)}</td>
        <td className="px-4 py-2 text-center">{paymentMethodSlug(payment_method)}</td>
        <td className="px-4 py-2 text-center">{totalPriceAfter.toLocaleString()}</td>
        <td className="px-4 py-2 text-center">{discount} ج.م</td>
        <td className="px-4 py-2 text-center">{tax}%</td>
        <td className="px-4 py-2 text-center">{formattedEarnig} ج.م</td>
        <td className="px-4 py-2">
          <p
            onClick={() => openPopup("ordersPopup", { id, index })}
            className="cursor-pointer hover:underline w-fit mx-auto"
          >
            عرض الكل
          </p>
        </td>
        {tableFor === "overview" && (
          <td className="px-4 py-2 text-center cursor-pointer hover:underline">
            <Link href={`/clients/${client_id}`}>{name}</Link>
          </td>
        )}
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
