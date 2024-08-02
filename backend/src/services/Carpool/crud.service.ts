import { Repository, ILike, MoreThanOrEqual } from 'typeorm';
import db from '../../db';
import { Carpool } from '../../entities/Carpool/Carpool.entity';
import { Search, SortCarpool } from '../../types';
import createError from '../../utils/createError';
import { User } from '../../entities/User.entity';
import { Participant } from '../../entities/Carpool/Participant.entity';
import { PositionService } from '../Position/crud.service';
import { getValidProperties } from '../../utils/getValidProperties';
import { CarpoolInput, NewPositionInput } from '../../types/input';
import { Car } from '../../entities/Car.entity';
import { CarService } from '../Car/crud.service';

export class CarpoolService {
  private db: Repository<Carpool>;

  constructor() {
    this.db = db.getRepository(Carpool);
  }

  async getAll(search: Search, sort?: SortCarpool): Promise<Carpool[]> {
    const { from, to, date, passengers } = search;
    const { departure, travelTime, price } = sort || {};

    const queryBuilder = this.db
      .createQueryBuilder('carpool')
      .leftJoinAndSelect('carpool.departure', 'departure')
      .leftJoinAndSelect('carpool.arrival', 'arrival')
      .leftJoinAndSelect('carpool.car', 'car')
      .leftJoinAndSelect('car.owner', 'owner')
      .leftJoinAndSelect('carpool.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'user');

    if (from) {
      queryBuilder.andWhere('departure.city ILIKE :from', { from: `%${from}%` });
    }

    if (to) {
      queryBuilder.andWhere('arrival.city ILIKE :to', { to: `%${to}%` });
    }

    if (date) {
      queryBuilder.andWhere('carpool.departure_time >= :date', { date: new Date(date) });
    }

    if (passengers) {
      queryBuilder.andWhere('carpool.max_passengers >= :passengers', { passengers });
    }

    if (departure) {
      queryBuilder.addOrderBy('carpool.departure_time', 'ASC');
    }

    if (price) {
      queryBuilder.addOrderBy('carpool.price', 'ASC');
    }

    if (travelTime) {
      queryBuilder.addOrderBy('carpool.arrival_time - carpool.departure_time', 'ASC');
    }

    try {
      return await queryBuilder.getMany();
    } catch (e) {
      throw createError(`Cannot get all Carpools (service): ${(e as Error).message}`, 500);
    }
  }

  async getById(id: number): Promise<Carpool | null> {
    return await this.db.findOne({
      where: { id },
      relations: ['departure', 'arrival', 'car', 'car.owner', 'participants', 'participants.user'],
    });
  }

  async create(carpoolData: CarpoolInput, currentUser: Partial<User>): Promise<boolean> {
    try {
      const positionService = new PositionService();
      const newCarpool = getValidProperties(carpoolData);
      const departure = await positionService.findOrCreatePosition(
        newCarpool.departure as NewPositionInput,
      );
      const arrival = await positionService.findOrCreatePosition(
        newCarpool.arrival as NewPositionInput,
      );
      const car = await new CarService().getById(newCarpool.carId);

      const carpool = this.db.create({
        departure,
        arrival,
        departure_time: newCarpool.departure_time,
        arrival_time: newCarpool.arrival_time,
        max_passengers: newCarpool.max_passengers,
        price: newCarpool.price,
        carpool_type: newCarpool.carpool_type,
        car: car as Car,
        participants: [{ user: currentUser as User, participant_type: 'driver' }],
      });

      await carpool.save();
      return true;
    } catch (e) {
      console.error(`Cannot create carpool: ${(e as Error).message}`);
      return false;
    }
  }

  async update(id: number, carpoolData: CarpoolInput): Promise<Carpool | null> {
    const carpool = await this.db.findOneBy({ id });
    if (!carpool) {
      return null;
    }
    Object.assign(carpool, carpoolData);
    return await this.db.save(carpool);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete(id);
    return result.affected !== 0;
  }
}
