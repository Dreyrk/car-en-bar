import { DataSource } from 'typeorm';
import env from './env';
import { User } from './entities/User.entity';
import { Carpool } from './entities/Carpool/Carpool.entity';
import { PreviousCarpool } from './entities/Carpool/Previous.entity';
import { Car } from './entities/Car.entity';
import { Position } from './entities/Position.entity';
import { Participant } from './entities/Carpool/Participant.entity';
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST, NODE_ENV } = env;

const db = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [User, Carpool, PreviousCarpool, Car, Position, Participant],
  synchronize: true,
  logging: NODE_ENV !== 'test',
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities.map((entity) => `"${entity.tableName}"`).join(', ');
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
