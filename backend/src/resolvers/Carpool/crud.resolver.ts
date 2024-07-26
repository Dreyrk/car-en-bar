import { Resolver, Query, Mutation, Arg, Int, InputType, Field, Authorized } from 'type-graphql';
import { Carpool } from '../../entities/Carpool/Carpool.entity';
import { CarpoolService } from '../../services/Carpool/crud.service';
import { GraphQLError } from 'graphql';
import { getValidProperties } from '../../utils/getValidProperties';
import { Search, SearchArgs } from '../../types';
import createError from '../../utils/createError';

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
  async getAllCarpools(@Arg('search', () => SearchArgs) search: Search): Promise<Carpool[]> {
    try {
      return await this.carpoolService.getAll(search);
    } catch (e) {
      throw createError(`Cannot get all Carpools: ${(e as Error).message}`, 500);
    }
  }

  @Query(() => Carpool, { nullable: true })
  async getCarpoolById(@Arg('id', () => Int) id: number): Promise<Carpool | null> {
    try {
      return await this.carpoolService.getById(id);
    } catch (e) {
      throw createError(`Cannot get Carpool n°${id}: ${(e as Error).message}`, 500);
    }
  }

  @Authorized()
  @Mutation(() => Carpool)
  async createCarpool(@Arg('carpool') carpool: CarpoolInput): Promise<Carpool> {
    try {
      const newCarpool = getValidProperties(carpool);
      return await this.carpoolService.create(newCarpool);
    } catch (e) {
      throw createError(`Cannot create Carpool: ${(e as Error).message}`, 500);
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
      throw createError(`Cannot update Carpool n°${id}: ${(e as Error).message}`, 500);
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteCarpool(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      return await this.carpoolService.delete(id);
    } catch (e) {
      throw createError(`Cannot delete Carpool n°${id}: ${(e as Error).message}`, 500);
    }
  }
}
