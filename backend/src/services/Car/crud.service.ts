import { Repository } from 'typeorm';
import db from '../../db';
import { Car } from '../../entities/Car.entity';

export class CarService {
  private db: Repository<Car>;

  constructor() {
    this.db = db.getRepository(Car);
  }

  async getAll(): Promise<Car[]> {
    return await this.db.find();
  }

  async getById(id: number): Promise<Car | null> {
    return await this.db.findOneBy({ id });
  }

  async create(carData: Partial<Car>): Promise<Car> {
    const car = this.db.create(carData);
    return await this.db.save(car);
  }

  async update(id: number, carData: Partial<Car>): Promise<Car | null> {
    const car = await this.db.findOneBy({ id });
    if (!car) {
      return null;
    }
    Object.assign(car, carData);
    return await this.db.save(car);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete(id);
    return result.affected !== 0;
  }
}
