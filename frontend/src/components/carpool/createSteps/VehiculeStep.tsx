import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetUserCarsQuery } from "@/graphql/generated/schema";
import Link from "next/link";

export default function VehiculeStep({ setState }: { setState: React.Dispatch<React.SetStateAction<any>> }) {
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
              onClick={() => setState((prev: any) => ({ ...prev, car }))}
              key={car.id}
              className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
              variant={"ghost"}>
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
