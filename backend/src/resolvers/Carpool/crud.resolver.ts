import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Carpool } from "../entities/Carpool/Carpool.entity";

@Resolver()
export class CarpoolResolver {
  @Query(() => [Carpool])
  async carpools(): Promise<Carpool[]> {
    return await Carpool.find();
  }

  @Query(() => Carpool, { nullable: true })
  async carpool(
    @Arg("id", () => Int) id: number,
  ): Promise<Carpool | undefined> {
    return await Carpool.findOne(id);
  }

  @Mutation(() => Carpool)
  async createCarpool(
    @Arg("departureCity") departureCity: string,
    @Arg("arrivalCity") arrivalCity: string,
    @Arg("departureTime") departureTime: Date,
    @Arg("maxPassengers", () => Int) maxPassengers: number,
    @Arg("departureLat", { nullable: true }) departureLat?: number,
    @Arg("departureLng", { nullable: true }) departureLng?: number,
    @Arg("arrivalLat", { nullable: true }) arrivalLat?: number,
    @Arg("arrivalLng", { nullable: true }) arrivalLng?: number,
    @Arg("carpoolType") carpoolType: string,
    @Arg("carId", () => Int) carId: number,
  ): Promise<Carpool> {
    const carpool = Carpool.create({
      departureCity,
      arrivalCity,
      departureTime,
      maxPassengers,
      departureLat,
      departureLng,
      arrivalLat,
      arrivalLng,
      carpoolType,
      car: { id: carId },
    });
    await carpool.save();
    return carpool;
  }

  @Mutation(() => Carpool, { nullable: true })
  async updateCarpool(
    @Arg("id", () => Int) id: number,
    @Arg("departureCity", { nullable: true }) departureCity?: string,
    @Arg("arrivalCity", { nullable: true }) arrivalCity?: string,
    @Arg("departureTime", { nullable: true }) departureTime?: Date,
    @Arg("maxPassengers", { nullable: true }) maxPassengers?: number,
    @Arg("departureLat", { nullable: true }) departureLat?: number,
    @Arg("departureLng", { nullable: true }) departureLng?: number,
    @Arg("arrivalLat", { nullable: true }) arrivalLat?: number,
    @Arg("arrivalLng", { nullable: true }) arrivalLng?: number,
    @Arg("carpoolType", { nullable: true }) carpoolType?: string,
    @Arg("carId", { nullable: true }) carId?: number,
  ): Promise<Carpool | null> {
    const carpool = await Carpool.findOne(id);
    if (!carpool) {
      return null;
    }
    if (departureCity) {
      carpool.departureCity = departureCity;
    }
    if (arrivalCity) {
      carpool.arrivalCity = arrivalCity;
    }
    // Add similar checks for other fields

    await carpool.save();
    return carpool;
  }

  @Mutation(() => Boolean)
  async deleteCarpool(@Arg("id", () => Int) id: number): Promise<boolean> {
    const carpool = await Carpool.findOne(id);
    if (!carpool) {
      throw new Error(`Carpool with id ${id} not found`);
    }
    await carpool.remove();
    return true;
  }
}
