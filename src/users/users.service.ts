// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm'; // DataSource를 사용
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntity : Repository<UserEntity>,

        // DataSource를 해당 서비스에 주입한다.
        @InjectDataSource() 
        private dataSource : DataSource,
    ){}

    async getAllUsers(){
        return await this.dataSource.query(`SELECT * FROM users`)
    }
}
