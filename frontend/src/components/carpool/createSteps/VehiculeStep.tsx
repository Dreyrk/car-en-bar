import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetUserCarsQuery } from "@/graphql/generated/schema";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VehiculeStep({
  setState,
  state,
}: {
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: any;
}) {
  const { data, loading, error } = useGetUserCarsQuery();

  const userCars = data?.getProfile.cars;

  return (
    <div>
      <h1 className="font-semibold text-2xl">Vehicule Step</h1>
      <div>
        {loading ? (
          <Loader />
        ) : userCars?.length ? (
          userCars?.map((car) => (
            <Button
              onClick={() => {
                setState((prev: any) => (prev.car.id === car.id ? { ...prev, car: {} } : { ...prev, car }));
              }}
              key={car.id}
              className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
              variant={"ghost"}>
              {state.car.id === car.id && <CheckCircle />}
              <span className="text-lg max-md:text-sm whitespace-nowrap">{`${car.brand} ${car.model}`}</span>
            </Button>
          ))
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <span>Sorry, you don&apos;t have cars registered on your account</span>
            <Link href={`/profile/${data?.getProfile.id}/vehicule/new`}>
              <Button variant={"link"}>Register a car</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
