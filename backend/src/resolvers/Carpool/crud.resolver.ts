import { Resolver, Query, Mutation, Arg, Int, InputType, Field, Authorized } from 'type-graphql';
import { Carpool } from '../../entities/Carpool/Carpool.entity';
import { CarpoolService } from '../../services/Carpool/crud.service';
import { GraphQLError } from 'graphql';
import { getValidProperties } from '../../utils/getValidProperties';

@InputType()
class CarpoolInput {
  @Field({ nullable: true })
  departure_time?: Date;

  @Field(() => Int, { nullable: true })
  max_passengers?: number;

  @Field({ nullable: true })
  carpool_type?: string;

  @Field(() => Int, { nullable: true })
  departureId?: number;

  @Field(() => Int, { nullable: true })
  arrivalId?: number;

  @Field(() => Int, { nullable: true })
  carId?: number;
}

@Resolver()
export class CarpoolResolver {
  private carpoolService: CarpoolService;

  constructor() {
    this.carpoolService = new CarpoolService();
  }

  @Query(() => [Carpool])
  async getAllCarpools(): Promise<Carpool[]> {
    try {
      return await this.carpoolService.getAll();
    } catch (e) {
      throw new GraphQLError(`Cannot get all Carpools: ${(e as Error).message}`);
    }
  }

  @Query(() => Carpool, { nullable: true })
  async getCarpoolById(@Arg('id', () => Int) id: number): Promise<Carpool | null> {
    try {
      return await this.carpoolService.getById(id);
    } catch (e) {
      throw new GraphQLError(`Cannot get Carpool n°${id}: ${(e as Error).message}`);
    }
  }

  @Authorized()
  @Mutation(() => Carpool)
  async createCarpool(@Arg('carpool') carpool: CarpoolInput): Promise<Carpool> {
    try {
      const newCarpool = getValidProperties(carpool);
      return await this.carpoolService.create(newCarpool);
    } catch (e) {
      throw new GraphQLError(`Cannot create Carpool: ${(e as Error).message}`);
    }
  }

  @Authorized()
  @Mutation(() => Carpool, { nullable: true })
  async updateCarpool(
    @Arg('id', () => Int) id: number,
    @Arg('updatedCarpool') updatedCarpool: CarpoolInput,
  ): Promise<Carpool | null> {
    try {
      const carpoolData: Partial<Carpool> = getValidProperties(updatedCarpool);
      return await this.carpoolService.update(id, carpoolData);
    } catch (e) {
      throw new GraphQLError(`Cannot update Carpool n°${id}: ${(e as Error).message}`);
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteCarpool(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      return await this.carpoolService.delete(id);
    } catch (e) {
      throw new GraphQLError(`Cannot delete Carpool n°${id}: ${(e as Error).message}`);
    }
  }
}
