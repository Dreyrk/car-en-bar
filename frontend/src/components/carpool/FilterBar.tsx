import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function FilterBar() {
  return (
    <aside className="md:w-[30%] flex flex-col gap-6">
      <h3 className="flex justify-between items-center">
        <span className="font-semibold text-xl">Sort By</span>{" "}
        <Button className="text-blue-500 font-semibold" variant={"ghost"}>
          Clear
        </Button>
      </h3>
      <section className="flex flex-col gap-2">
        <Button className="w-full h-full" variant={"ghost"}>
          <label className="h-full w-full flex gap-4 justify-between items-center" htmlFor="departure_asc">
            <Input className="w-4 h-4" id="departure_asc" type="radio" />
            <span className="flex-grow flex justify-start items-center h-full text-neutral-700">Departure ASAP</span>
          </label>
        </Button>
      </section>
    </aside>
  );
}
