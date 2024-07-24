"use client";

import TripCard from "@/components/carpool/TripCard";
import ErrorPage from "@/components/sections/ErrorPage";
import Loader from "@/components/ui/loader";
import { useAllCarpoolsQuery } from "@/graphql/generated/schema";
import { CarpoolType } from "@/types";

export default function Page() {
  const { data, loading, error } = useAllCarpoolsQuery();

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
      <main>
        <h1>All time</h1>
        <span className="font-semibold text-ghost text-sm">{data?.getAllCarpools.length} carpools available</span>
        <div className="md:flex">
          <aside className="md:w-[30%] flex flex-col gap-6">
            <span>filter bar</span>
          </aside>
          <div className="overflow-y-auto w-full md:w-[70%] flex flex-col gap-4 py-10 px-6">
            {data?.getAllCarpools.map((carpool) => (
              <TripCard key={carpool.id} carpool={carpool as CarpoolType} />
            ))}
          </div>
        </div>
      </main>
    );
  }
}
