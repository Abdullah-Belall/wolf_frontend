"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { ProductInterface, SortInterface } from "../types/interfaces";

interface SearchContextsStateInterface {
  sorts: { results: SortInterface[] | null; total: number };
  products: { results: ProductInterface[] | null; total: number };
}

interface SearchContextInterface {
  getSearch: (searchContextsName: keyof SearchContextsStateInterface) => {
    results: any;
    total: number;
  };
  fillSearch: (
    searchContextsName: keyof SearchContextsStateInterface,
    data: { results: any; total: number }
  ) => void;
  emptySearch: (searchContextsName: keyof SearchContextsStateInterface) => void;
}

const SearchContext = createContext<SearchContextInterface | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<SearchContextsStateInterface>({
    sorts: { results: null, total: 0 },
    products: { results: null, total: 0 },
  });
  const getSearch = (searchContextsName: keyof SearchContextsStateInterface) => {
    return search[searchContextsName];
  };
  const fillSearch = (
    searchContextsName: keyof SearchContextsStateInterface,
    data: { results: any; total: number }
  ) => {
    setSearch((prev) => ({
      ...prev,
      [searchContextsName]: data,
    }));
  };
  const emptySearch = (searchContextsName: keyof SearchContextsStateInterface) => {
    setSearch((prev) => ({
      ...prev,
      [searchContextsName]: { results: null, total: 0 },
    }));
  };
  return (
    <SearchContext.Provider value={{ getSearch, fillSearch, emptySearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextInterface => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
