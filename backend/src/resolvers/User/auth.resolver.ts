import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import UserService, { InputLogin, InputRegister, Profile } from '../../services/User/user.service';
import { ContextType, Message } from '../../types';
import { User, verifyPassword } from '../../entities/User.entity';
import jwt, { Secret } from 'jsonwebtoken';
import createError from '../../utils/createError';
import generateConfirmMailBody from '../../services/mail/generateConfirmMailBody';
import { sendMail } from '../../services/mail/sendMail';
import db from '../../db';

@Resolver()
export default class UserResolver {
  @Mutation(() => Message)
  async register(@Arg('newUser') newUser: InputRegister) {
    const alreadyRegistered = Boolean(await new UserService().findUserByEmail(newUser.email));
    if (alreadyRegistered) {
      return { success: false, message: 'Already Registered' };
    } else {
      try {
        await new UserService().createUser(newUser);
        return { success: true, message: 'Account Created !' };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }

  @Mutation(() => Message)
  async login(@Arg('user') { email, password }: InputLogin, @Ctx() ctx: ContextType) {
    try {
      const user = await User.findByEmailWithPassword(email);
      if (
        user === null ||
        typeof user.password !== 'string' ||
        !(await verifyPassword(password, user.password))
      ) {
        return { success: false, message: 'Wrong Credentials...' };
      }
      const secret = process.env.JWT_PRIVATE_KEY as string;
      const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
        algorithm: 'HS256',
        expiresIn: '7d',
      });

      if (token) {
        ctx.res.cookie('token', token, {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
        });
        ctx.currentUser = user;
        return { success: true, message: 'Authenticated' };
      }
    } catch (err) {
      console.error(err as Error);
      return {
        success: false,
        message: `Login Mutation: ${(err as Error).message}`,
      };
    }
  }

  @Authorized()
  @Mutation(() => Message)
  async sendConfirmMail(@Ctx() ctx: ContextType, @Arg('id') id: number): Promise<Message> {
    const user = await User.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'confirmed_email'],
    });

    if (user?.confirmed_email) {
      return { success: false, message: 'email already confirmed' };
    }

    if (user) {
      const body = generateConfirmMailBody(user.id, user.username);
      const mailSent = await sendMail(user.email, 'Email Confirmation for Car-en-bar', body);
      user.confirm_email_sent = new Date();
      await User.update({ id: user.id }, user);
      return { success: mailSent, message: mailSent ? 'Email sent' : 'Cannot send email' };
    }

    return { success: true, message: 'logged out' };
  }

  @Mutation(() => Message)
  async confirmMail(@Ctx() ctx: ContextType, @Arg('token') token?: string): Promise<Message> {
    if (!token) {
      return { success: false, message: 'Missing token' };
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
      const emailToConfirm = await User.findOne({
        where: { id: Number((payload as { id: number }).id) },
        select: ['email', 'confirmed_email', 'id'],
      });

      if (!emailToConfirm) {
        return { success: false, message: 'User not found' };
      }

      if (!emailToConfirm.email) {
        return { success: false, message: 'Email not found' };
      }

      emailToConfirm.confirmed_email = true;
      emailToConfirm.confirm_email_sent = undefined;
      await User.update({ id: Number((payload as { id: number }).id) }, emailToConfirm);

      return {
        success: true,
        message: 'Email confirmed',
        userId: Number((payload as { id: number }).id),
      };
    } catch (e) {
      throw createError(`Failed to confirm email: ${(e as Error).message}`, 500);
    }
  }

  @Authorized()
  @Mutation(() => Message)
  async logout(@Ctx() { req, res, currentUser }: ContextType): Promise<Message> {
    const token = req.headers.cookie?.split('token=')[1] || null;
    if (currentUser && token) {
      res.clearCookie('token');
      return { success: true, message: 'logged out' };
    } else {
      return { success: false, message: 'no currentUser' };
    }
  }

  @Authorized()
  @Query(() => Profile)
  async getProfile(@Ctx() { currentUser }: ContextType): Promise<Profile> {
    try {
      if (!currentUser) {
        throw createError('User is not logged in', 401);
      }

      const user = await User.findOne({ where: { id: currentUser.id } });
      if (!user) {
        throw createError('User not found', 404);
      }
      return user as Profile;
    } catch (e) {
      throw createError(`Cannot get Profile: ${(e as Error).message}`, 500);
    }
  }
}
