import { InputType, Field, Int, Float } from "type-graphql";

@InputType()
export class CarpoolInput {
  @Field()
  departureCity: string;

  @Field()
  arrivalCity: string;

  @Field()
  departureTime: Date;

  @Field(() => Int)
  maxPassengers: number;

  @Field(() => Float, { nullable: true })
  departureLat: number;

  @Field(() => Float, { nullable: true })
  departureLng: number;

  @Field(() => Float, { nullable: true })
  arrivalLat?: number;

  @Field(() => Float, { nullable: true })
  arrivalLng?: number;

  @Field()
  carpoolType: string;

  @Field(() => Int)
  carId: number;
}
