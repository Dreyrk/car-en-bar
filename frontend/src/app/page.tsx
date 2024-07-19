import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
            <Input id="departure-date" type="date" className="w-full" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passengers">Passengers</Label>
            <Input id="passengers" type="number" placeholder="1" className="w-full" />
          </div>
        </div>
        <Button size="lg" className="w-full">
          Search
        </Button>
      </Card>
    </main>
  );
}
