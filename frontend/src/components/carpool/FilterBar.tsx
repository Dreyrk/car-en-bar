import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SortCarpool } from "@/types";
import { useSearchParams } from "next/navigation";
import { FilterBarProps } from "@/types/props";

const defaultSort: SortCarpool = {
  departure: false,
  price: false,
  travelTime: false,
};

export default function FilterBar({ refetch }: FilterBarProps) {
  const params = useSearchParams();
  const [sort, setSort] = useState<SortCarpool>(defaultSort);

  const resetSort = () => {
    setSort(defaultSort);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setSort({
      departure: false,
      price: false,
      travelTime: false,
      [id]: true,
    });
  };

  const search = {
    from: params.get("from") || "",
    to: params.get("to") || "",
    date: params.get("date") || "",
    passengers: Number(params.get("passengers")) || 1,
  };

  useEffect(() => {
    const updateData = async () => {
      await refetch({
        search,
        sort,
      });
    };

    updateData();
  }, [params, sort]);

  // TO DO Collapse filters on mobile

  return (
    <aside className="md:w-[30%] flex flex-col gap-6 max-md:px-4">
      <h3 className="flex justify-between items-center">
        <span className="font-semibold text-xl">Sort By</span>
        <Button onClick={resetSort} className="text-blue-500 font-semibold" variant={"ghost"}>
          Clear
        </Button>
      </h3>
      <section className="flex flex-col gap-2">
        <Button className="w-full h-full" variant={"ghost"}>
          <label className="h-full w-full flex gap-4 justify-between items-center" htmlFor="departure">
            <Input checked={sort.departure} onChange={handleChange} className="w-4 h-4" id="departure" type="radio" />
            <span className="flex-grow flex justify-start items-center h-full text-neutral-700">Departure ASAP</span>
          </label>
        </Button>
        <Button className="w-full h-full" variant={"ghost"}>
          <label className="h-full w-full flex gap-4 justify-between items-center" htmlFor="price">
            <Input checked={sort.price} onChange={handleChange} className="w-4 h-4" id="price" type="radio" />
            <span className="flex-grow flex justify-start items-center h-full text-neutral-700">Bests Deals</span>
          </label>
        </Button>
        <Button className="w-full h-full" variant={"ghost"}>
          <label className="h-full w-full flex gap-4 justify-between items-center" htmlFor="travelTime">
            <Input checked={sort.travelTime} onChange={handleChange} className="w-4 h-4" id="travelTime" type="radio" />
            <span className="flex-grow flex justify-start items-center h-full text-neutral-700">Shortest Travel</span>
          </label>
        </Button>
      </section>
    </aside>
  );
}
