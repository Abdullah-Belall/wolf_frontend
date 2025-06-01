"use client";
import dynamic from "next/dynamic";
const SortsClient = dynamic(() => import("@/app/components/sorts/sorts-page"), { ssr: false });
export default function Sorts() {
  return <SortsClient />;
}
