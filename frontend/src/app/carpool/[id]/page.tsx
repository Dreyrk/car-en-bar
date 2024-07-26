"use client";

import { WalkIndicator } from "@/components/carpool/TripCard";
import ErrorPage from "@/components/sections/ErrorPage";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import TravelSeparator from "@/components/ui/TravelSeparator";
import UserBox from "@/components/user/UserBox";
import { useGetCarpoolByIdQuery } from "@/graphql/generated/schema";
import formatDateTime from "@/utils/formatDate";
import getTimeDifference from "@/utils/getTimeDifference";
import isDateInPast from "@/utils/isDateInPast";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";

export default function Page({ params: { id } }: { params: { id: number } }) {
  const { data, loading, error } = useGetCarpoolByIdQuery({
    variables: {
      id: Number(id),
    },
  });
  const carpool = data?.getCarpoolById;

  if (loading) {
    return (
      <main className="grid place-content-center place-items-center">
        <Loader size={40} />
      </main>
    );
  }

  if (error) {
    return <ErrorPage error={error} />;
  }
  const departureTime = formatDateTime(carpool?.departure_time);
  const arrivalTime = formatDateTime(carpool?.arrival_time);
  const drivers = carpool?.participants.filter(({ participant_type }) => participant_type === "driver");
  return (
    <main className="py-6">
      <div className="mb-6">
        <h2 className="md:text-xl">
          Departure on <span className="font-semibold">{departureTime.date}</span> at{" "}
          <span className="font-semibold">{departureTime.time}</span>
        </h2>
        <h2 className="md:text-xl">
          Arrival on <span className="font-semibold">{arrivalTime.date}</span> at{" "}
          <span className="font-semibold">{arrivalTime.time}</span>
        </h2>
      </div>
      <div className="w-full max-w-6xl md:mx-auto flex flex-col justify-center items-center gap-6 mt-8 md:px-20">
        <div className="w-full flex justify-center items-center gap-6 text-ghost">
          <Info />
          {isDateInPast(carpool?.departure_time) ? (
            <span>This Carpool is unavailable</span>
          ) : (
            <span>Departure in {getTimeDifference(new Date().toString(), carpool?.departure_time)}</span>
          )}
        </div>
        <Separator orientation="horizontal" className="rounded-full min-w-full h-2 mb-2" />
        <Link
          href={`/position/${carpool?.departure.id}`}
          className=" w-full flex gap-4 p-4 hover:bg-muted rounded-md transition-colors duration-300">
          <div className="flex flex-col justify-between">
            <span className="font-semibold">{departureTime.time}</span>
            <span className="text-ghost text-xs font-semibold mb-4">
              {getTimeDifference(carpool?.departure_time, carpool?.arrival_time)}
            </span>
          </div>
          <TravelSeparator className="translate-y-6 h-[100px]" orientation="vertical" />
          <div className="flex flex-col gap-2 flex-grow">
            <span className="font-semibold">{carpool?.departure.address}</span>
            <span className="text-ghost text-xs font-semibold">{carpool?.departure.city}</span>
            <WalkIndicator />
          </div>
          <Button className="my-auto hover:animate-bounce-left" variant={"ghost"}>
            <ChevronRight size={30} />
          </Button>
        </Link>
        <Link
          href={`/position/${carpool?.arrival.id}`}
          className="w-full flex justify-between gap-10 p-4 hover:bg-muted rounded-md transition-colors duration-300">
          <div className="flex flex-col gap-2">
            <span className="font-semibold">{arrivalTime.time}</span>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <span className="font-semibold">{carpool?.arrival.address}</span>
            <span className="text-ghost text-xs font-semibold">{carpool?.arrival.city}</span>
            <WalkIndicator />
          </div>
          <Button className="my-auto hover:animate-bounce-left" variant={"ghost"}>
            <ChevronRight size={30} />
          </Button>
        </Link>
        <Separator orientation="horizontal" className="rounded-full min-w-full h-2 mb-2" />
        {drivers?.map(({ user }) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}
