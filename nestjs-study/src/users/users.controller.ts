import { Body, Controller, Get, Post, Put, Delete, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service'; 
import { User } from './user.entity';

@Controller('/users')
export class UsersController{
    constructor(private usersService: UsersService){}

    @Get('/all')
    public async getAll(){
        return this.usersService.findAll(); 
    }
    
    @Post('/create')
    public async post(@Body() user: User): Promise<User> {
        return this.usersService.create(user); 
    }

    @Put(':id')
    public async put(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.usersService.update(String(+id), user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<string> {
      try {
        const message = await this.usersService.delete(id);
        return message; // Retorna a mensagem recebida do serviço
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }
    }
} 