import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity : Repository<UserEntity>,

        @InjectDataSource() private dataSource : DataSource,
    ){}

    async getAllUsers(){
        return await this.dataSource.query(`SELECT * FROM users`)
    }
}
