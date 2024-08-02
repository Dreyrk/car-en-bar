import { Repository } from 'typeorm';
import db from '../../db';
import { Car } from '../../entities/Car.entity';
import { User } from '../../entities/User.entity';

export class CarService {
  private db: Repository<Car>;

  constructor() {
    this.db = db.getRepository(Car);
  }

  async getAll(): Promise<Car[]> {
    return await this.db.find();
  }

  async getById(id: number | undefined): Promise<Car | null> {
    if (id) {
      return await this.db.findOneBy({ id });
    } else {
      return null;
    }
  }

  async create(carData: Partial<Car>, userId?: number): Promise<Car> {
    let car: Car;
    if (userId) {
      const currentUser = await User.findOne({ where: { id: userId } });
      if (!currentUser) {
        throw new Error('User not found');
      }

      car = this.db.create(carData);
      car.owner = currentUser;

      const savedCar = await this.db.save(car);

      currentUser.cars = [...(currentUser.cars || []), savedCar];
      await currentUser.save();

      return savedCar;
    }
    car = this.db.create(carData);
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
