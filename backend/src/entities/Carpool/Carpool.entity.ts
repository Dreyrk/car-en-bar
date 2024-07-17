import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Car } from "../Car.entity";
import { Participant } from "./Participant.entity";
import { Field, Int } from "type-graphql";
import { Position } from "../Position.entity";

@Entity()
export class Carpool {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Position)
  @ManyToOne(() => Position, { nullable: true })
  departure: Position;

  @Field(() => Position)
  @ManyToOne(() => Position, { nullable: true })
  arrival: Position;

  @Field()
  @Column({ type: "timestamp" })
  departure_time: Date;

  @Field()
  @Column()
  max_passengers: number;

  @Field()
  @Column({ type: "enum", enum: ["offer", "request"] })
  carpool_type: string;

  @ManyToOne(() => Car)
  car: Car;

  @OneToMany(() => Participant, (participant) => participant.carpool)
  participants: Participant[];
}
