import { ILike, Repository } from 'typeorm';
import db from '../../db';
import { Position } from '../../entities/Position.entity';
import { NewPositionInput } from '../../types/input';
export class PositionService {
  private db: Repository<Position>;

  constructor() {
    this.db = db.getRepository(Position);
  }

  async getAll(search?: string): Promise<Position[]> {
    if (!search) {
      return await this.db.find({});
    } else {
      return await this.db.find({
        where: [
          { address: ILike(`%${search}%`) },
          { city: ILike(`%${search}%`) },
          { postal_code: ILike(`%${search}%`) },
        ],
      });
    }
  }

  async getById(id: number): Promise<Position | null> {
    return await this.db.findOneBy({ id });
  }

  async findOrCreatePosition(positionInput: NewPositionInput): Promise<Position> {
    let position = await this.db.findOne({
      where: {
        address: positionInput.address,
        city: positionInput.city,
        postal_code: positionInput.postal_code,
        country: positionInput.country,
      },
    });

    if (!position) {
      position = this.db.create(positionInput);
      await position.save();
    }

    return position;
  }

  async create(positionData: Position): Promise<Position> {
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
