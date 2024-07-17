import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "../User.entity";
import { Carpool } from "./Carpool.entity";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class PreviousCarpool extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.previousCarpools)
  user: User;

  @Field(() => Carpool)
  @ManyToOne(() => Carpool)
  carpool: Carpool;

  @Field(() => Int, { nullable: true })
  @Column({ type: "integer", nullable: true })
  rating: number;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  comment: string;
}
