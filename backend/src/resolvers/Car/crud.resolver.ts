import { Resolver, Query, Mutation, Arg, Int, Field, InputType, Ctx } from 'type-graphql';
import { Car } from '../../entities/Car.entity';
import { CarService } from '../../services/Car/crud.service';
import { ContextType, Message } from '../../types';
import createError from '../../utils/createError';
import { CarInput } from '../../types/input';

@Resolver()
export class CarResolver {
  private carService: CarService;

  constructor() {
    this.carService = new CarService();
  }

  @Query(() => [Car])
  async getCars(): Promise<Car[]> {
    return await this.carService.getAll();
  }

  @Query(() => Car, { nullable: true })
  async getCar(@Arg('id', () => Int) id: number): Promise<Car | null> {
    return await this.carService.getById(id);
  }

  @Mutation(() => Message)
  async createCar(
    @Ctx() { currentUser }: ContextType,
    @Arg('car') carData: CarInput,
  ): Promise<Message> {
    try {
      if (!currentUser) {
        await this.carService.create(carData);
        return { success: true, message: `car created` };
      } else {
        await this.carService.create(carData, currentUser.id);
        return { success: true, message: `user ${currentUser.id} car created` };
      }
    } catch (e) {
      throw createError(`Cannot create car : ${(e as Error).message}`, 500);
    }
  }

  @Mutation(() => Car, { nullable: true })
  async updateCar(
    @Arg('id', () => Int) id: number,
    @Arg('data') carData: CarInput,
  ): Promise<Car | null> {
    return await this.carService.update(id, carData);
  }

  @Mutation(() => Boolean)
  async deleteCar(@Arg('id', () => Int) id: number): Promise<boolean> {
    return await this.carService.delete(id);
  }
}
