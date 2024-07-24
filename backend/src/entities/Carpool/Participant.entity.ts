import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, Column } from 'typeorm';
import { User } from '../User.entity';
import { Carpool } from './Carpool.entity';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Participant extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.carpools)
  user: User;

  @Field(() => [Carpool])
  @ManyToOne(() => Carpool)
  carpool: Carpool;

  @Field(() => String)
  @Column({ type: 'enum', enum: ['driver', 'passenger'] })
  participant_type: string;
}
