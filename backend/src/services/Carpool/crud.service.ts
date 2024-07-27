import { Repository, ILike, MoreThanOrEqual } from 'typeorm';
import db from '../../db';
import { Carpool } from '../../entities/Carpool/Carpool.entity';
import { Search, SortCarpool } from '../../types';
import createError from '../../utils/createError';

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

  async create(carpoolData: Partial<Carpool>): Promise<Carpool> {
    const carpool = this.db.create(carpoolData);
    return await this.db.save(carpool);
  }

  async update(id: number, carpoolData: Partial<Carpool>): Promise<Carpool | null> {
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
