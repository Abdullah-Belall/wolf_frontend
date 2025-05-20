"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import Link from "next/link";

export default function OrdersTableRow({
  earnig,
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
  earnig: number;
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
  const formattedEarnig = earnig.toLocaleString();
  let totalPriceAfter = earnig;
  if (tax != "0") {
    totalPriceAfter = (totalPriceAfter * Number(tax)) / 100 + totalPriceAfter;
  }
  if (discount) {
    totalPriceAfter -= discount;
  }
  const { openPopup } = usePopup();
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
        <td className="px-4 py-2 text-center">{payment_status}</td>
        <td className="px-4 py-2 text-center">{payment_method}</td>
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
