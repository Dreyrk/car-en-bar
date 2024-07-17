import { Column, Repository } from "typeorm";
import db from "../../db";
import { User } from "../../entities/User.entity";
import { Field, InputType, ObjectType } from "type-graphql";

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = db.getRepository(User);
  }

  async findUserByEmail(email: string) {
    try {
      return await this.db.findOneBy({ email });
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  async findUserById(id: number) {
    try {
      return await this.db.findOneBy({ id });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }

  async createUser({ username, email, password }: InputRegister) {
    try {
      const newUser = this.db.create({ username, email, password });
      return await this.db.save(newUser);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}

@InputType()
export class InputRegister {
  @Field()
  @Column()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class InputLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class Profile extends User {
  @Field(() => String, { nullable: true })
  declare password: never;
}
