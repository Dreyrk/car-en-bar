import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../entities/User.entity';
import express from 'express';

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User | null;
}

export interface Payload {
  userId: number;
  role: string;
}

export interface Message {
  success: boolean;
  message: string;
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

export type Search = {
  from: string;
  to: string;
  date: string;
  passengers: number;
};

@InputType()
export class SearchArgs implements Partial<Search> {
  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  passengers?: number;
}
