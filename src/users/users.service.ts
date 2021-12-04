import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleEnum } from 'src/types';
import { ErrorCodes } from 'src/utils/errors';
import { comparePasswords, encryptPassword } from 'src/utils/misc';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput, UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(input: CreateUserInput): Promise<User> {
    const { name, username, password } = input;

    const user = await this.findOneByUsername(username);

    if (user) {
      throw new NotAcceptableException({
        message: 'Username already exists',
        code: ErrorCodes.UsernameAlreadyExists,
      });
    }

    const encryptedPassword = await encryptPassword(password);

    return await this.prisma.user.create({
      data: {
        name,
        username,
        password: encryptedPassword,
        roles: [UserRoleEnum.Seller],
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findAllSellers(id: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        id: { not: id },
        roles: { has: UserRoleEnum.Seller },
      },
    });
  }

  findOneById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async updatePassword(id: string, data: UpdatePasswordInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    const match = await comparePasswords(data.currentPassword, user.password);

    if (!match) {
      throw new NotAcceptableException({
        message: 'Current password does not match user password',
        code: ErrorCodes.InvalidCurrentPassword,
      });
    }

    const hashedPassword = await encryptPassword(data.newPassword);

    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
