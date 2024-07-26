"use client";

import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDaysIcon } from "lucide-react";

import { SelectSingleEventHandler } from "react-day-picker";
import { toast } from "sonner";
import extractAddress from "@/utils/extractAdress";
import { Address } from "@/types";

type Search = {
  from: Address;
  to: Address;
  date: Date;
  passengers: number;
};

const libraries: Library[] = ["core", "maps", "places", "marker"];

export default function SearchBarCarpool() {
  const router = useRouter();
  const [search, setSearch] = useState<Search>({
    from: {
      address: "",
      city: "",
      country: "",
      postalcode: "",
    },
    to: {
      address: "",
      city: "",
      country: "",
      postalcode: "",
    },
    date: new Date(),
    passengers: 1,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const departureAutoCompleteRef = useRef<HTMLInputElement>(null);
  const arrivalAutoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const fromAutoComplete = new google.maps.places.Autocomplete(
        departureAutoCompleteRef.current as HTMLInputElement
      );
      fromAutoComplete.addListener("place_changed", () => {
        const place = fromAutoComplete.getPlace();
        setSearch((prev) => ({ ...prev, from: extractAddress(place) }));
      });

      const toAutoComplete = new google.maps.places.Autocomplete(arrivalAutoCompleteRef.current as HTMLInputElement);
      toAutoComplete.addListener("place_changed", () => {
        const place = toAutoComplete.getPlace();
        setSearch((prev) => ({ ...prev, to: extractAddress(place) }));
      });
    }
  }, [isLoaded]);

  const onSubmit = () => {
    const { from, to, date, passengers } = search;
    router.push(
      `/carpool?from=${encodeURIComponent(from.city)}&to=${encodeURIComponent(
        to.city
      )}&date=${date.toISOString()}&passengers=${passengers}`
    );
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onDateSelect: SelectSingleEventHandler = (newDate) => {
    if (!newDate || newDate.setHours(1, 1, 1, 1) < new Date().setHours(0, 0, 0, 0)) {
      toast.warning("Please Select a correct date");
      return false;
    } else {
      setSearch((prev) => ({ ...prev, date: newDate ?? new Date() }));
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="from">Departure</Label>
        <Input
          id="from"
          ref={departureAutoCompleteRef}
          type="text"
          onChange={onChange}
          placeholder="Where from?"
          className="w-full"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="to">Arrival</Label>
        <Input
          id="to"
          type="text"
          ref={arrivalAutoCompleteRef}
          onChange={onChange}
          placeholder="Where to?"
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="date">Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start font-normal">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                <span>{search.date.toLocaleDateString("FR-fr")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                id="date"
                selected={search.date}
                onSelect={onDateSelect}
                className="p-4"
                initialFocus
                mode="single"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Input id="passengers" onChange={onChange} type="number" placeholder="1" className="w-full" />
        </div>
      </div>
      <Button onClick={onSubmit} size="lg" className="w-full">
        Search
      </Button>
    </Card>
  );
}
