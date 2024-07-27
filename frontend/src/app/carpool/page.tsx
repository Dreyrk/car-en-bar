"use client";

import FilterBar from "@/components/carpool/FilterBar";
import TripCard from "@/components/carpool/TripCard";
import ErrorPage from "@/components/sections/ErrorPage";
import Loader from "@/components/ui/loader";
import { useAllCarpoolsQuery } from "@/graphql/generated/schema";
import { CarpoolType } from "@/types";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

type SearchParams = {
  from: string;
  to: string;
  date: string;
  passengers: number;
};

export default function Page() {
  const searchParams = useSearchParams();
  const search = {
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    date: searchParams.get("date"),
    passengers: Number(searchParams.get("passengers")),
  };
  const { data, loading, error, refetch } = useAllCarpoolsQuery({
    variables: {
      search,
    },
  });

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (loading) {
    return (
      <main className="grid place-content-center">
        <Loader size={50} />
      </main>
    );
  } else {
    return (
      <main className="pt-4">
        <div className="ml-8 mb-8">
          <h1 className="font-semibold text-2xl">
            <span className="text-2xl font-normal">Departure on</span>{" "}
            {search.date ? new Date(search.date).toLocaleDateString("FR-fr") : "All Carpool"}
          </h1>
          {search.from ? (
            <h2 className="text-ghost flex items-center gap-2">
              <span className="font-semibold text-lg">{search.from}</span>
              <ArrowRight size={20} />
              <span className="font-semibold text-lg">{search.to}</span>
            </h2>
          ) : (
            <h2>All destinations</h2>
          )}
          <span className="font-semibold text-ghost text-sm">{data?.getAllCarpools.length} carpools available</span>
        </div>
        <div className="md:flex">
          <FilterBar refetch={refetch} />
          <div className="overflow-y-auto no-scrollbar max-h-[80dvh] w-full md:w-[70%] flex flex-col gap-4 py-10 px-6">
            {data?.getAllCarpools.map((carpool) => (
              <TripCard key={carpool.id} carpool={carpool as CarpoolType} />
            ))}
          </div>
        </div>
      </main>
    );
  }
}
