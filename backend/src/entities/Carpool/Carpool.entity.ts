import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Car } from '../Car.entity';
import { Participant } from './Participant.entity';
import { Field, Int, ObjectType } from 'type-graphql';
import { Position } from '../Position.entity';

@ObjectType()
@Entity()
export class Carpool extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Position)
  @ManyToOne(() => Position)
  departure: Position;

  @Field(() => Position)
  @ManyToOne(() => Position)
  arrival: Position;

  @Field()
  @Column({ type: 'timestamp' })
  departure_time: Date;

  @Field()
  @Column({ type: 'timestamp' })
  arrival_time: Date;

  @Field()
  @Column()
  max_passengers: number;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column({ type: 'enum', enum: ['offer', 'request'] })
  carpool_type: string;

  @Field(() => Car)
  @ManyToOne(() => Car)
  car: Car;

  @Field(() => [Participant])
  @OneToMany(() => Participant, (participant) => participant.carpool)
  participants: Participant[];
}
