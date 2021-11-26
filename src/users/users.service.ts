import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { comparePasswords, encryptPassword } from "src/utils/misc";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdatePasswordInput, UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOneById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
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
      throw new BadRequestException(
        "Current password does not match user password"
      );
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
