import { Car } from "lucide-react";
import Walk from "../Icons/Walk";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { CarpoolType } from "@/types";

export default function TripCard({ carpool }: { carpool: CarpoolType }) {
  return (
    <Link href={"/"}>
      <div className="rounded-md h-[240px] p-4 shadow-card shadow-neutral-300 hover:shadow-blue-400">
        <div className="h-[65%] w-full flex justify-between">
          <div className="flex gap-4 h-full">
            <div className="flex flex-col justify-between h-full">
              <span className="text-lg font-semibold">{carpool.departure_time}</span>
              <span className="text-xs text-center font-semibold text-slate-500">
                {Number(carpool.arrival_time) - Number(carpool.departure_time)}
              </span>
              <span className="text-lg font-semibold">{carpool.arrival_time}</span>
            </div>
            <div className="px-1 pt-2 max-h-[72%]">
              <div className="w-3 h-3 rounded-full border border-neutral-700"></div>
              <Separator className="w-1 bg-neutral-700 mx-auto" orientation="vertical" />
              <div className="w-3 h-3 rounded-full border border-neutral-700"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <span className="text-lg font-semibold">{carpool.departure}</span>
                <WalkIndicator />
              </div>
              <div className="space-y-1">
                <span className="text-lg font-semibold">{carpool.arrival}</span>
                <WalkIndicator />
              </div>
            </div>
          </div>
          <span className="font-semibold text-lg">{carpool.price} €</span>
        </div>
        <Separator className="w-full my-4" />
        <div className="h-[20%] flex items-center gap-8">
          <Car color="#9ab3b8" />
          {carpool.participants.map(({ user: { username, id } }) => (
            <div key={id} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{username?.charAt(0) || "JD"}</AvatarFallback>
              </Avatar>
              <span className="whitespace-nowrap">{username || "John Doe"}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function WalkIndicator({ type }: { type?: 1 | 2 | 3 }) {
  switch (type) {
    case 1:
      return (
        <div className="flex space-x-1">
          <Walk />
          <Walk />
          <Walk className="bg-green-600" />
        </div>
      );
    case 2:
      return (
        <div className="flex space-x-1">
          <Walk />
          <Walk className="bg-yellow-400" />
          <Walk />
        </div>
      );
    case 3:
      return (
        <div className="flex space-x-1">
          <Walk className="bg-red-600" />
          <Walk />
          <Walk />
        </div>
      );

    default:
      return (
        <div className="flex space-x-1">
          <Walk className="bg-red-600" />
          <Walk className="bg-yellow-400" />
          <Walk className="bg-green-600" />
        </div>
      );
  }
}
