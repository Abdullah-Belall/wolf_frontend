"use client";

import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ReturnedItemInterface } from "@/app/utils/types/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CusReturnedItemInterface extends ReturnedItemInterface {
  index?: number;
}

export default function ReturnsTableRows({
  index,
  qty,
  created_at,
  order_item,
}: CusReturnedItemInterface) {
  const router = useRouter();
  const { openPopup } = usePopup();

  const price = Number(order_item.unit_price) * qty;
  const unitPrice = Number(order_item.unit_price);
  const sort = order_item.sort;

  return (
    <tr>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">{price.toLocaleString()} ج.م</td>
      <td className="px-4 py-2 text-center">{unitPrice.toLocaleString()} ج.م</td>
      <td className="px-4 py-2 text-center">{qty}</td>

      <td className="px-4 py-2 text-center max-w-[120px]">{sort?.size ?? "لا يوجد"}</td>
      <td className="px-4 py-2 text-center max-w-[120px]">
        {!sort?.color || sort?.color === "" ? "لا يوجد" : sort.color}
      </td>
      <td className="px-4 py-2">
        <p
          onClick={() => {
            router.push(`/products`);
            openPopup("sortsPopup", {
              id: sort?.product?.id,
              name: sort?.product?.name,
            });
          }}
          className="w-fit mx-auto hover:underline cursor-pointer"
        >
          {sort?.name ?? "لا يوجد"}
        </p>
      </td>
      <td className="px-4 py-2">
        <p
          onClick={() => {
            router.push(`/products`);
            openPopup("sortsPopup", {
              id: sort?.product?.id,
              name: sort?.product?.name,
            });
          }}
          className="w-fit mx-auto hover:underline cursor-pointer"
        >
          {sort?.product?.name}
        </p>
      </td>
      <td className="px-4 py-2 text-center">
        <Link
          href={`/clients/${order_item.order.client.id}`}
          className={`w-fit mx-auto hover:underline cursor-pointer`}
        >
          {order_item?.order?.client?.user_name}
        </Link>
      </td>
      <td className="px-4 py-2 text-center">{index}</td>
    </tr>
  );
}
