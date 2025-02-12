import { Entity, Column } from 'typeorm';
import { IAuth } from "../interfaces";
import { BaseEntity } from 'src/core/entities/baseEntity.entities';


@Entity()
export class Auth extends BaseEntity implements IAuth{
    @Column('text', {unique: true})
    username: string;
    @Column('text', {unique: true})
    email: string;
    @Column('text', { select: false })
    password: string;
    @Column('text', {
        array:true,
        default: ['user']
    })
    roles: string[]
    @Column('bool', {
        default: true
    })
    isActive: boolean;
}
