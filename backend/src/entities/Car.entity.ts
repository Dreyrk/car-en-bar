import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Field, Int } from "type-graphql";

@Entity()
export class Car {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @ManyToOne(() => User, (user) => user.cars)
  owner?: User;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  year?: number;

  @Column({ nullable: true })
  plate_number?: string;
}
