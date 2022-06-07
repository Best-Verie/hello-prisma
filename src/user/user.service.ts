import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(userData: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: userData,
    });
  }
}
