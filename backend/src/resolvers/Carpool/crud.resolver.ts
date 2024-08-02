import { Resolver, Query, Mutation, Arg, Int, Authorized, Ctx } from 'type-graphql';
import { Carpool } from '../../entities/Carpool/Carpool.entity';
import { CarpoolService } from '../../services/Carpool/crud.service';
import { getValidProperties } from '../../utils/getValidProperties';
import { ContextType, Message, Search, SearchArgs, SortArgs, SortCarpool } from '../../types';
import createError from '../../utils/createError';
import { CarpoolInput } from '../../types/input';
import { User } from '../../entities/User.entity';

@Resolver()
export class CarpoolResolver {
  private carpoolService: CarpoolService;

  constructor() {
    this.carpoolService = new CarpoolService();
  }

  @Query(() => [Carpool])
  async getAllCarpools(
    @Arg('search', () => SearchArgs) search: Search,
    @Arg('sort', () => SortArgs, { nullable: true }) sort?: SortCarpool,
  ): Promise<Carpool[]> {
    try {
      return await this.carpoolService.getAll(search, sort);
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
  async createCarpool(
    @Ctx() { currentUser }: ContextType,
    @Arg('carpool') carpoolData: CarpoolInput,
  ): Promise<Message> {
    try {
      const success = await this.carpoolService.create(carpoolData, currentUser as Partial<User>);
      if (success) {
        return { success, message: 'created successfully' };
      } else {
        return { success, message: 'Somthing wrong' };
      }
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
      const carpoolData = getValidProperties(updatedCarpool);
      return await this.carpoolService.update(id, carpoolData as CarpoolInput);
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
