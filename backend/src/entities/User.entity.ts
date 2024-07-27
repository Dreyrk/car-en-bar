import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { Car } from './Car.entity';
import { Participant } from './Carpool/Participant.entity';
import { PreviousCarpool } from './Carpool/Previous.entity';
import { argon2id, hash, verify } from 'argon2';
import { Field, Int, ObjectType } from 'type-graphql';

type Role = 'USER' | 'ADMIN';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await hash(this.password);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  username?: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ select: false })
  password: string;

  @Field()
  @Column({ type: 'text', enum: ['ADMIN', 'USER'], default: 'USER' })
  role: Role;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Field(() => [Car], { nullable: true })
  @OneToMany(() => Car, (car) => car.owner)
  cars?: Car[];

  @Field(() => [Participant], { nullable: true })
  @OneToMany(() => Participant, (participant) => participant.user)
  carpools?: Participant[];

  @Field(() => [PreviousCarpool], { nullable: true })
  @OneToMany(() => PreviousCarpool, (previous) => previous.user)
  previousCarpools?: PreviousCarpool[];

  public static async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .addSelect('user.password') // Inclut la colonne password dans la sélection
      .where('user.email = :email', { email })
      .getOne();
  }
}

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
  };

  return await verify(hashedPassword, plainPassword, hashingOptions);
};
