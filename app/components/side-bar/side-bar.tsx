"use client";
import { cairo } from "@/app/utils/fonts/main.font";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import { Button } from "@mui/material";
import SideBarList from "./side-bar-list";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaPerson } from "react-icons/fa6";
import { FaIdCardAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FiCodesandbox } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Link from "next/link";

export default function SideBar() {
  const path = usePathname();
  const dataItems = useMemo(
    () =>
      sideBarItems.map((item, index) => (
        <SideBarList
          key={index}
          title={item.title}
          secTitle={item.secTitle}
          icon={item.icon}
          data={item.data}
          lastTitle={item.lastTitle}
        />
      )),
    [sideBarItems]
  );

  return (
    <aside className="overflow-y-scroll flex flex-col gap-2 px-mainxs pb-[20px] pt-[80px] fixed right-0 top-0 w-[240px] h-dvh bg-myLight border-l-3 border-[#eee]">
      <Link className="w-full" href={"/"}>
        <Button
          className={`${
            path === "/" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-start !px-mainxs !flex !gap-[5px] !items-center !justify-end !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          الواجهة الرئيسية
          <HomeFilledIcon fontSize="small" className="opacity-50 group-hover:opacity-100" />
        </Button>
      </Link>
      <Link className="w-full" href={"/categories"}>
        <Button
          className={`${
            path === "/categories" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-start !px-mainxs !flex !gap-[5px] !items-center !justify-end !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          الفئات
          <BiCategory className="opacity-50 group-hover:opacity-100" />
        </Button>
      </Link>
      <Link className="w-full" href={"/orders"}>
        <Button
          className={`${
            path === "/orders" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-start !px-mainxs !flex !gap-[5px] !items-center !justify-end !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          الطلبات
          <IoIosCheckmarkCircleOutline className="opacity-50 group-hover:opacity-100" />
        </Button>
      </Link>

      {dataItems}
    </aside>
  );
}
//
const sideBarItems = [
  {
    title: "المنتجات",
    lastTitle: "فاتورة",
    secTitle: "منتج",
    icon: <FiCodesandbox className="opacity-50 group-hover:opacity-100" />,
    data: { firstPath: "/products", secPath: "/add-product", lastPath: "/products/sorts" },
  },
  {
    title: "العملاء",
    secTitle: "عميل",
    icon: <FaPerson className="opacity-50 group-hover:opacity-100" />,
    data: { firstPath: "/clients", secPath: "/add-client" },
  },
  {
    title: "الموظفين",
    secTitle: "موظف",
    icon: <FaIdCardAlt className="opacity-50 group-hover:opacity-100" />,
    data: { firstPath: "/workers", secPath: "/add-worker" },
  },
];
