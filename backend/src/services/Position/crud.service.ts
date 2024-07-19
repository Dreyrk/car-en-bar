import { Repository } from 'typeorm';
import db from '../../db';
import { Position } from '../../entities/Position.entity';

export class PositionService {
  private db: Repository<Position>;

  constructor() {
    this.db = db.getRepository(Position);
  }

  async getAll(): Promise<Position[]> {
    return await this.db.find();
  }

  async getById(id: number): Promise<Position | null> {
    return await this.db.findOneBy({ id });
  }

  async create(positionData: Partial<Position>): Promise<Position> {
    const position = this.db.create(positionData);
    return await this.db.save(position);
  }

  async update(id: number, positionData: Partial<Position>): Promise<Position | null> {
    const position = await this.db.findOneBy({ id });
    if (!position) {
      return null;
    }
    Object.assign(position, positionData);
    return await this.db.save(position);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete(id);
    return result.affected !== 0;
  }
}
