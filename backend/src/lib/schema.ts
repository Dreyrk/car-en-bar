import { buildSchema } from 'type-graphql';
import UserResolver from '../resolvers/User/auth.resolver';
import { CarpoolResolver } from '../resolvers/Carpool/crud.resolver';
import authChecker from '../services/auth/authChecker';
import { CarResolver } from '../resolvers/Car/crud.resolver';
export default buildSchema({
  resolvers: [UserResolver, CarpoolResolver, CarResolver],
  authChecker,
});
