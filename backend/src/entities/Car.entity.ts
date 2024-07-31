import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './User.entity';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Car extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.cars)
  owner?: User;

  @Field()
  @Column()
  brand: string;

  @Field()
  @Column()
  model: string;

  @Field()
  @Column({ nullable: true })
  year?: number;

  @Field()
  @Column({ nullable: true })
  plate_number?: string;
}
