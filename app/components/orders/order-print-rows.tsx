"use client";

import { formatDate } from "@/app/utils/base";
import { SortInterface } from "@/app/utils/types/interfaces";

interface CusSortInterface extends SortInterface {
  index: number;
}

export default function OrderPrintRows({
  index,
  product,
  name,
  color,
  size,
  qty,
  price,
  created_at,
}: CusSortInterface) {
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">{price} ج.م</td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">{product?.material}</td>
        <td className="px-4 py-2 text-center">{size}</td>
        <td className="px-4 py-2 text-center">{color ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{name}</td>
        <td className="px-4 py-2 text-center">{product?.name}</td>
        <td className="px-4 py-2 text-center max-w-[69px]">{index}</td>
      </tr>
    </>
  );
}
