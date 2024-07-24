"use client";

import TripCard from "@/components/carpool/TripCard";
import ErrorPage from "@/components/sections/ErrorPage";
import Loader from "@/components/ui/loader";
import GET_ALL_CARPOOLS from "@/graphql/carpool/getAll";
import { CarpoolType } from "@/types";
import { useQuery } from "@apollo/client";

export default function Page() {
  const { data, loading, error } = useQuery(GET_ALL_CARPOOLS);

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (loading) {
    return <Loader />;
  } else {
    return (
      <main>
        <h1>All Carpools</h1>
        <span>{data.getAllCarpools.length} carpools available</span>
        <div className="overflow-y-auto flex flex-col gap-4 py-10 px-6">
          {data.getAllCarpools.map((carpool: CarpoolType) => (
            <TripCard key={carpool.id} carpool={carpool} />
          ))}
        </div>
      </main>
    );
  }
}
