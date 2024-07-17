import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import UserService, {
  InputLogin,
  InputRegister,
} from "../../services/User/auth.service";
import { ContextType, Message } from "../../types";
import db from "../../db";
import { User, verifyPassword } from "../../entities/User.entity";
import jwt from "jsonwebtoken";

@Resolver()
export default class UserResolver {
  @Mutation(() => Message)
  async register(@Arg("newUser") newUser: InputRegister) {
    const alreadyRegistered = Boolean(
      await new UserService().findUserByEmail(newUser.email),
    );
    if (alreadyRegistered) {
      return { success: false, message: "Already Registered" };
    } else {
      try {
        await new UserService().createUser(newUser);
        return { success: true, message: "Account Created !" };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }
  @Mutation(() => Message)
  async login(
    @Arg("user") { email, password }: InputLogin,
    @Ctx() ctx: ContextType,
  ) {
    try {
      const user = await db.getRepository(User).findOne({ where: { email } });
      if (
        user === null ||
        typeof user.password !== "string" ||
        !(await verifyPassword(password, user.password))
      ) {
        return { success: false, message: "Wrong Credentials..." };
      }
      const secret = process.env.JWT_PRIVATE_KEY as string;
      const token = jwt.sign({ userId: user.id, role: user.role }, secret);
      if (token) {
        ctx.res.cookie("token", token, {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
        });
        ctx.currentUser = user;
        return { success: true, message: "Authenticated" };
      }
    } catch (err) {
      console.error(err as Error);
      return {
        success: false,
        message: `Login Mutation: ${(err as Error).message}`,
      };
    }
  }

  @Mutation(() => Message)
  async logout(
    @Ctx() { req, res, currentUser }: ContextType,
  ): Promise<Message> {
    const token = req.headers.cookie?.split("token=")[1] || null;
    if (currentUser && token) {
      res.clearCookie("token");
      return { success: true, message: "logged out" };
    } else {
      return { success: false, message: "no currentUser" };
    }
  }
}
