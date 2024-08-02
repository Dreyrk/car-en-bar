import { User } from '../entities/User.entity';
import { Car } from '../entities/Car.entity';
import { Carpool } from '../entities/Carpool/Carpool.entity';
import { Participant } from '../entities/Carpool/Participant.entity';
import { PreviousCarpool } from '../entities/Carpool/Previous.entity';
import { Position } from '../entities/Position.entity';
import db from '../db';

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`),
    ),
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`),
    ),
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function seed() {
  try {
    await db.initialize();
    await clearDB();
    const userRepository = db.getRepository(User);
    const carRepository = db.getRepository(Car);
    const carpoolRepository = db.getRepository(Carpool);
    const participantRepository = db.getRepository(Participant);
    const previousCarpoolRepository = db.getRepository(PreviousCarpool);
    const positionRepository = db.getRepository(Position);

    // Créer des utilisateurs
    const users = [
      { email: 'johndoe@email.com', username: 'johndoe', password: 'password' },
      { email: 'janedoe@email.com', username: 'janedoe', password: 'password' },
      { email: 'user3@email.com', username: 'user3', password: 'password' },
      { email: 'user4@email.com', username: 'user4', password: 'password' },
    ];

    const savedUsers = await userRepository.save(users);

    // Créer des voitures
    const cars = [
      {
        owner: savedUsers[0],
        brand: 'Toyota',
        model: 'Corolla',
        year: 2015,
        plate_number: 'ABC-123',
        max_passengers: 2,
      },
      {
        owner: savedUsers[1],
        brand: 'Honda',
        model: 'Civic',
        year: 2018,
        plate_number: 'XYZ-789',
        max_passengers: 2,
      },
      {
        owner: savedUsers[2],
        brand: 'Ford',
        model: 'Focus',
        year: 2017,
        plate_number: 'JKL-456',
        max_passengers: 2,
      },
      {
        owner: savedUsers[3],
        brand: 'Chevrolet',
        model: 'Malibu',
        year: 2016,
        plate_number: 'MNO-111',
        max_passengers: 2,
      },
    ];

    const savedCars = await carRepository.save(cars);

    // Créer des positions
    const positions = [
      {
        address: '123 Rue de Rivoli',
        city: 'Paris',
        postal_code: '75001',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
      },
      {
        address: '1 Place Antonin Poncet',
        city: 'Lyon',
        postal_code: '69002',
        country: 'France',
        latitude: 45.764,
        longitude: 4.8357,
      },
      {
        address: '1 Boulevard Charles Livon',
        city: 'Marseille',
        postal_code: '13007',
        country: 'France',
        latitude: 43.2965,
        longitude: 5.3698,
      },
      {
        address: '5 Promenade des Anglais',
        city: 'Nice',
        postal_code: '06000',
        country: 'France',
        latitude: 43.7102,
        longitude: 7.262,
      },
      {
        address: '123 Champs-Élysées',
        city: 'Paris',
        postal_code: '75008',
        country: 'France',
        latitude: 48.8698,
        longitude: 2.3076,
      },
      {
        address: 'Place Bellecour',
        city: 'Lyon',
        postal_code: '69002',
        country: 'France',
        latitude: 45.7578,
        longitude: 4.8324,
      },
      {
        address: 'Vieux-Port',
        city: 'Marseille',
        postal_code: '13002',
        country: 'France',
        latitude: 43.2964,
        longitude: 5.3698,
      },
      {
        address: 'Mont Boron',
        city: 'Nice',
        postal_code: '06300',
        country: 'France',
        latitude: 43.7019,
        longitude: 7.2908,
      },
    ];

    const savedPositions = await positionRepository.save(positions);

    // Créer des covoiturages
    const carpools = [
      {
        departure: savedPositions[0],
        arrival: savedPositions[1],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        max_passengers: 3,
        price: 26,
        carpool_type: 'offer',
        car: savedCars[0],
      },
      {
        departure: savedPositions[2],
        arrival: savedPositions[3],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 1.5 * 60 * 60 * 1000),
        max_passengers: 2,
        price: 40,
        carpool_type: 'offer',
        car: savedCars[1],
      },
      {
        departure: savedPositions[4],
        arrival: savedPositions[5],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        max_passengers: 4,
        price: 30,
        carpool_type: 'offer',
        car: savedCars[2],
      },
      {
        departure: savedPositions[6],
        arrival: savedPositions[7],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 1.5 * 60 * 60 * 1000),
        max_passengers: 3,
        price: 35,
        carpool_type: 'offer',
        car: savedCars[3],
      },
      {
        departure: savedPositions[0],
        arrival: savedPositions[3],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        max_passengers: 5,
        price: 50,
        carpool_type: 'offer',
        car: savedCars[0],
      },
      {
        departure: savedPositions[2],
        arrival: savedPositions[5],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
        max_passengers: 2,
        price: 45,
        carpool_type: 'offer',
        car: savedCars[1],
      },
      {
        departure: savedPositions[4],
        arrival: savedPositions[7],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
        max_passengers: 3,
        price: 55,
        carpool_type: 'offer',
        car: savedCars[2],
      },
      {
        departure: savedPositions[6],
        arrival: savedPositions[1],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 2.5 * 60 * 60 * 1000),
        max_passengers: 4,
        price: 60,
        carpool_type: 'offer',
        car: savedCars[3],
      },
      {
        departure: savedPositions[0],
        arrival: savedPositions[5],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 3.5 * 60 * 60 * 1000),
        max_passengers: 3,
        price: 28,
        carpool_type: 'offer',
        car: savedCars[0],
      },
      {
        departure: savedPositions[2],
        arrival: savedPositions[7],
        departure_time: new Date(),
        arrival_time: new Date(new Date().getTime() + 4.5 * 60 * 60 * 1000),
        max_passengers: 5,
        price: 70,
        carpool_type: 'offer',
        car: savedCars[1],
      },
    ];

    const savedCarpools = await carpoolRepository.save(carpools);

    // Créer des participants au covoiturage
    const participants = savedCarpools.map((carpool, index) => {
      const participant = new Participant();
      participant.carpool = carpool;
      participant.user = savedUsers[index % savedUsers.length];
      participant.participant_type = 'driver';
      return participant;
    });

    await participantRepository.save(participants);

    // Créer des covoiturages précédents
    const previousCarpools = savedCarpools.map((carpool, index) => {
      const previousCarpool = new PreviousCarpool();
      previousCarpool.carpool = carpool;
      previousCarpool.user = savedUsers[index % savedUsers.length];
      previousCarpool.rating = Math.floor(Math.random() * 5) + 1;
      previousCarpool.comment = 'Great ride!';
      return previousCarpool;
    });

    await previousCarpoolRepository.save(previousCarpools);

    console.log('Database filled !');
    await db.destroy();
  } catch (e) {
    console.error(e);
    console.error(`Cannot fill database: ${(e as Error).message}`);
    process.exit(1);
  }
}

seed();
