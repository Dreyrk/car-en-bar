import { Separator } from "./separator";

export default function TravelSeparator({
  orientation,
  travelTime,
}: {
  orientation: "vertical" | "horizontal";
  travelTime?: string;
}) {
  if (travelTime) {
    return (
      <div className="relative flex items-center justify-center p-2">
        <div className="min-w-3 min-h-3 rounded-full border border-neutral-700"></div>
        <Separator className="bg-neutral-700 h-[4px]" orientation={orientation} />
        <div className="min-w-3 min-h-3 rounded-full border border-neutral-700"></div>
        <span className="absolute text-xs font-semibold text-ghost top-[6px] left-[42%] px-2 z-10 bg-card">
          {travelTime}
        </span>
      </div>
    );
  }
  return (
    <>
      <div className="w-3 h-3 rounded-full border border-neutral-700"></div>
      <Separator className="w-1 bg-neutral-700 mx-auto" orientation={orientation} />
      <div className="w-3 h-3 rounded-full border border-neutral-700"></div>
    </>
  );
}
