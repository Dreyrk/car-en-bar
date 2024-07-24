import { Repository } from 'typeorm';
import db from '../../db';
import { Carpool } from '../../entities/Carpool/Carpool.entity';

export class CarpoolService {
  private db: Repository<Carpool>;

  constructor() {
    this.db = db.getRepository(Carpool);
  }

  async getAll(): Promise<Carpool[]> {
    return await this.db.find({
      relations: ['departure', 'arrival', 'car', 'car.owner', 'participants', 'participants.user'],
    });
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
