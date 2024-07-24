"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDaysIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBarCarpool() {
  const router = useRouter();
  const search = () => {
    router.push(`/`);
  };
  return (
    <Card className="w-full max-w-md p-6 space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="departure">Departure</Label>
        <Input id="departure" type="text" placeholder="Where from?" className="w-full" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="arrival">Arrival</Label>
        <Input id="arrival" type="text" placeholder="Where to?" className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="departure-date">Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span>Select a date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar className="p-4" initialFocus mode="range" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Input id="passengers" type="number" placeholder="1" className="w-full" />
        </div>
      </div>
      <Button onClick={search} size="lg" className="w-full">
        Search
      </Button>
    </Card>
  );
}
