import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class NewPositionInput {
  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  postal_code: string;

  @Field()
  country: string;

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;
}

@InputType()
export class CarpoolInput {
  @Field(() => NewPositionInput)
  departure: NewPositionInput;

  @Field(() => NewPositionInput)
  arrival: NewPositionInput;

  @Field()
  departure_time: Date;

  @Field()
  arrival_time: Date;

  @Field()
  max_passengers: number;

  @Field()
  price: number;

  @Field()
  carpool_type: 'offer' | 'request';

  @Field(() => Int)
  carId: number;
}

@InputType()
export class CarInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  plate_number?: string;

  @Field()
  max_passengers: number;
}
