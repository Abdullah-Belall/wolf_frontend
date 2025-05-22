"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CostsInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

interface CusProductInterface extends CostsInterface {
  index?: number;
}
export default function CostsTableRows({
  id,
  index,
  sort,
  qty,
  price,
  created_at,
}: CusProductInterface) {
  const router = useRouter();
  const { openPopup } = usePopup();
  const [openDesc, setOpenDesc] = useState(false);
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">{Number(price).toLocaleString()} ج.م</td>
        <td className="px-4 py-2 text-center">
          {(Number(price) / Number(qty)).toLocaleString()} ج.م
        </td>
        <td className={`px-4 py-2 text-center`}>{qty}</td>
        <td className={`cursor-pointer px-4 py-2 text-center max-w-[120px]`}>
          {sort?.size ?? "لا يوجد"}
        </td>
        <td className={`cursor-pointer px-4 py-2 text-center max-w-[120px]`}>
          {!sort?.color || sort?.color === "" ? "لا يوجد" : sort.color}
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
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
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto hover:underline cursor-pointer"
          >
            {sort?.product?.name}
          </p>
        </td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
