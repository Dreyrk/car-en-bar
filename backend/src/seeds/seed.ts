import { User } from "../entities/User.entity";
import { Car } from "../entities/Car.entity";
import { Carpool } from "../entities/Carpool/Carpool.entity";
import { Participant } from "../entities/Carpool/Participant.entity";
import { PreviousCarpool } from "../entities/Carpool/Previous.entity";
import { Position } from "../entities/Position.entity";
import db from "../db";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) => runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`))
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) => runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`))
  );
  await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

async function seed() {
  try {
    const connection = await db.initialize();
    await clearDB();

    const userRepository = connection.getRepository(User);
    const carRepository = connection.getRepository(Car);
    const carpoolRepository = connection.getRepository(Carpool);
    const participantRepository = connection.getRepository(Participant);
    const previousCarpoolRepository = connection.getRepository(PreviousCarpool);
    const positionRepository = connection.getRepository(Position);

    // Créer des utilisateurs
    const user1 = new User();
    user1.email = "johndoe@email.com";
    user1.username = "johndoe";

    const user2 = new User();
    user2.email = "janedoe@email.com";
    user2.username = "janedoe";

    await userRepository.save([user1, user2]);

    // Créer des voitures
    const car1 = new Car();
    car1.owner = user1;
    car1.brand = "Toyota";
    car1.model = "Corolla";
    car1.year = 2015;
    car1.plate_number = "ABC-123";
    await carRepository.save(car1);

    const car2 = new Car();
    car2.owner = user2;
    car2.brand = "Honda";
    car2.model = "Civic";
    car2.year = 2018;
    car2.plate_number = "XYZ-789";
    await carRepository.save(car2);

    // Créer des positions
    const departurePosition1 = new Position();
    departurePosition1.address = "123 Rue de Rivoli";
    departurePosition1.city = "Paris";
    departurePosition1.postal_code = "75001";
    departurePosition1.country = "France";
    departurePosition1.latitude = 48.8566;
    departurePosition1.longitude = 2.3522;
    await positionRepository.save(departurePosition1);

    const arrivalPosition1 = new Position();
    arrivalPosition1.address = "1 Place Antonin Poncet";
    arrivalPosition1.city = "Lyon";
    arrivalPosition1.postal_code = "69002";
    arrivalPosition1.country = "France";
    arrivalPosition1.latitude = 45.764;
    arrivalPosition1.longitude = 4.8357;
    await positionRepository.save(arrivalPosition1);

    const departurePosition2 = new Position();
    departurePosition2.address = "1 Boulevard Charles Livon";
    departurePosition2.city = "Marseille";
    departurePosition2.postal_code = "13007";
    departurePosition2.country = "France";
    departurePosition2.latitude = 43.2965;
    departurePosition2.longitude = 5.3698;
    await positionRepository.save(departurePosition2);

    const arrivalPosition2 = new Position();
    arrivalPosition2.address = "5 Promenade des Anglais";
    arrivalPosition2.city = "Nice";
    arrivalPosition2.postal_code = "06000";
    arrivalPosition2.country = "France";
    arrivalPosition2.latitude = 43.7102;
    arrivalPosition2.longitude = 7.262;
    await positionRepository.save(arrivalPosition2);

    // Créer des covoiturages
    const carpool1 = new Carpool();
    carpool1.departure = departurePosition1;
    carpool1.arrival = arrivalPosition1;
    carpool1.departure_time = new Date();
    carpool1.max_passengers = 3;
    carpool1.carpool_type = "offer";
    carpool1.car = car1;
    await carpoolRepository.save(carpool1);

    const carpool2 = new Carpool();
    carpool2.departure = departurePosition2;
    carpool2.arrival = arrivalPosition2;
    carpool2.departure_time = new Date();
    carpool2.max_passengers = 2;
    carpool2.carpool_type = "offer";
    carpool2.car = car2;
    await carpoolRepository.save(carpool2);

    // Créer des participants au covoiturage
    const participant1 = new Participant();
    participant1.carpool = carpool1;
    participant1.user = user1;
    participant1.participant_type = "driver";
    await participantRepository.save(participant1);

    const participant2 = new Participant();
    participant2.carpool = carpool2;
    participant2.user = user2;
    participant2.participant_type = "driver";
    await participantRepository.save(participant2);

    // Créer des covoiturages précédents
    const previousCarpool1 = new PreviousCarpool();
    previousCarpool1.carpool = carpool1;
    previousCarpool1.user = user1;
    previousCarpool1.rating = 5;
    previousCarpool1.comment = "Great ride!";
    await previousCarpoolRepository.save(previousCarpool1);

    const previousCarpool2 = new PreviousCarpool();
    previousCarpool2.carpool = carpool2;
    previousCarpool2.user = user2;
    previousCarpool2.rating = 4;
    previousCarpool2.comment = "Very good experience.";
    await previousCarpoolRepository.save(previousCarpool2);

    console.log("Database filled !");
    await db.destroy();
  } catch (e) {
    throw new Error(`Cannot fill database: ${(e as Error).message}`);
  }
}

seed();
