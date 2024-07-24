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

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  year?: number;

  @Column({ nullable: true })
  plate_number?: string;
}
