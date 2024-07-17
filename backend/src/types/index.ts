import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/User.entity";
import express from "express";

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
