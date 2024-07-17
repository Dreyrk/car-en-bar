import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Position extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  postal_code: string;

  @Field()
  @Column()
  country: string;

  @Field({ nullable: true })
  @Column({ type: "decimal", precision: 10, scale: 6 })
  latitude?: number;

  @Field({ nullable: true })
  @Column({ type: "decimal", precision: 10, scale: 6 })
  longitude?: number;
}
