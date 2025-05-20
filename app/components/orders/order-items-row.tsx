"use client";

import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useRouter } from "next/navigation";

export default function OrderItemsTableRow({
  index,
  product,
  name,
  size,
  color,
  qty,
  unit_price,
}: {
  index: number;
  product: {
    id: string;
    name: string;
  };
  name: string;
  size: number;
  color: string | null;
  qty: number;
  unit_price: number;
}) {
  const router = useRouter();
  const formattedEarnig = (unit_price * qty).toLocaleString();
  const formattedUnitPrice = unit_price.toLocaleString();
  const { openPopup } = usePopup();
  console.log("color", color);
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formattedEarnig} ج.م</td>
        <td className="px-4 py-2 text-center">{formattedUnitPrice} ج.م</td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">{color ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{size}</td>
        <td className="px-4 py-2 text-center">{name}</td>
        <td className="px-4 py-2 text-center">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: product.id, name: product.name });
            }}
            className="cursor-pointer hover:underline w-fit mx-auto"
          >
            {product.name}
          </p>
        </td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
