import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary : 'call All user',
    description : 'call every user in the database'
  })
  async getAllUsers(){
    return await this.usersService.getAllUsers()
  }
}
