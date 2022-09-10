import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({type : 'varchar', nullable : false})
    name : string;

    @Column({type : 'int', nullable : true})
    age : number;

    @Column({type : 'varchar', nullable : false, unique : true})
    email : string;
}