import { Resolver, Query, Mutation, Arg, Int, InputType, Field, Authorized } from 'type-graphql';
import { getValidProperties } from '../../utils/getValidProperties';
import createError from '../../utils/createError';
import { PositionService } from '../../services/Position/crud.service';
import { Position } from '../../entities/Position.entity';

@InputType()
class PositionInput {
  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  postal_code: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  latitude?: number;

  @Field(() => String, { nullable: true })
  longitude?: number;
}

@Resolver()
export class PositionResolver {
  private positionService: PositionService;

  constructor() {
    this.positionService = new PositionService();
  }

  @Query(() => [Position])
  async getAllPositions(@Arg('search', () => String) search: string): Promise<Position[]> {
    try {
      return await this.positionService.getAll(search);
    } catch (e) {
      throw createError(`Cannot get all Positions: ${(e as Error).message}`, 500);
    }
  }

  @Query(() => Position, { nullable: true })
  async getPositionById(@Arg('id', () => Int) id: number): Promise<Position | null> {
    try {
      return await this.positionService.getById(id);
    } catch (e) {
      throw createError(`Cannot get Position n°${id}: ${(e as Error).message}`, 500);
    }
  }

  @Authorized(['ADMIN'])
  @Mutation(() => Position)
  async createPosition(@Arg('Position') position: PositionInput): Promise<Position> {
    try {
      const newPosition = getValidProperties(position);
      return await this.positionService.create(newPosition as Position);
    } catch (e) {
      throw createError(`Cannot create Position: ${(e as Error).message}`, 500);
    }
  }

  @Authorized(['ADMIN'])
  @Mutation(() => Position, { nullable: true })
  async updatePosition(
    @Arg('id', () => Int) id: number,
    @Arg('updatedPosition') updatedPosition: PositionInput,
  ): Promise<Position | null> {
    try {
      const positionData: Partial<Position> = getValidProperties(updatedPosition);
      return await this.positionService.update(id, positionData);
    } catch (e) {
      throw createError(`Cannot update Position n°${id}: ${(e as Error).message}`, 500);
    }
  }

  @Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deletePosition(@Arg('id', () => Int) id: number): Promise<boolean> {
    try {
      return await this.positionService.delete(id);
    } catch (e) {
      throw createError(`Cannot delete Position n°${id}: ${(e as Error).message}`, 500);
    }
  }
}
