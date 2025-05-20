import GeneralInfo from "./components/home/general-info";
import HomeTable from "./components/tables/home-table";

export default function Home() {
  return (
    <div className="flex flex-col gap-[40px] px-mainxs mt-[20px]">
      <GeneralInfo
        title={"النتائج العامة لهذا الشهر"}
        clients={20}
        returned={12}
        sold={120}
        total={24000}
      />
      <GeneralInfo
        title={"النتائج العامة لهذا العام"}
        clients={80}
        returned={66}
        sold={761}
        total={250000}
      />
      <HomeTable />{" "}
    </div>
  );
}
