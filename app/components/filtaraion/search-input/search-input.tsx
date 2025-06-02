"use client";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import { CLIENT_COLLECTOR_REQ, SEARCH_REQ } from "@/app/utils/requests/client-side.requests";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchInput({ searchin }: { searchin: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const { fillSearch } = useSearch();
  const [debounce, setDebounce] = useState<NodeJS.Timeout>();
  const handleInp = (value: string) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    const timer = setTimeout(() => {
      setValue(value);
    }, 1000);
    setDebounce(timer);
  };
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const fetchData = async () => {
      const currentSearchin = current.get("searchin");
      const response = await CLIENT_COLLECTOR_REQ(SEARCH_REQ, {
        searchin: currentSearchin,
        searchwith: value,
      });
      console.log(response);
      if (response.done) {
        fillSearch(currentSearchin as any, response.data);
      } else {
        console.log("problema");
      }
    };
    fetchData();
  }, [value]);
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const searchinValue = current.get("searchin");
    if (!searchinValue || searchinValue === "") {
      current.set("searchin", searchin);
      router.replace(`?${current.toString()}`);
    }
  }, [searchParams, router, searchin]);
  return (
    <form dir="rtl" className="min-w-xs">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearchOutline />
        </div>
        <input
          dir="rtl"
          type="search"
          id="default-search"
          className="bg-myHover block w-full px-4 py-2 ps-10 text-sm rounded-lg border border-foreground focus:border-mdDark outline-0"
          placeholder="Search Mockups, Logos..."
          onChange={(e) => handleInp(e.target.value)}
        />
      </div>
    </form>
  );
}
