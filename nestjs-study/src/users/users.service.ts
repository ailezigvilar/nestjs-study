import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  public async create(user: User): Promise<User>{
    return this.usersRepository.save(user);
  }

  async update(id: string, inputedUser: User): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { id: parseInt(id, 10) } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    existingUser.firstName = inputedUser.firstName;
    existingUser.lastName = inputedUser.lastName;
    existingUser.isActive = inputedUser.isActive;

    const updatedUser = await this.usersRepository.save(existingUser);
    return updatedUser;
  }

  async delete(id: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id: parseInt(id, 10) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
    return 'User was removed sucessfully';
  }

}