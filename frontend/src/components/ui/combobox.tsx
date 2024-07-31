"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ComboField } from "@/types";
import { FormControl } from "./form";

export default function Combobox({
  data,
  placeholder,
  form,
  name,
}: {
  data: ComboField[];
  placeholder?: string;
  form?: any;
  name?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {value ? data.find((data) => data.value === value)?.label : placeholder ?? "Select item..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Items..." />
          <CommandEmpty>No data found...</CommandEmpty>
          <CommandGroup>
            {data &&
              data.map((data, i) => (
                <CommandItem
                  key={data.value + `${i}`}
                  value={data.value}
                  onSelect={(currentValue) => {
                    form.setValue(name, currentValue);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  <Check className={cn("mr-2 h-4 w-4", value === data.value ? "opacity-100" : "opacity-0")} />
                  {data.label}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
