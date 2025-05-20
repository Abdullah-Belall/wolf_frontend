import { Button } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import UserCard from "../small-components/user-card";

export default function Users({ data, type }: { data: any; type: "client" | "worker" }) {
  return (
    <div dir="rtl" className="w-full px-mainxs">
      <div className="max-w-md mb-4">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-myDark sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-myDark">
            <IoSearch />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm outline-0 bg-myHover border border-mdLight rounded-md"
            placeholder="بحث ..."
            required
          />
          <div className=" absolute end-2.5 bottom-2.5">
            <Button sx={{ fontFamily: "cairo" }} className="!bg-mdDark" variant="contained">
              بحث{" "}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-[10px]">
        <UserCard type={type + "s"} username="احمد الشافعي" role="مالك" id="21342ccx2er1" />
      </div>
    </div>
  );
}
