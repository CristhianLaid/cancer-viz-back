
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { ICoreBaseModel } from '../interfaces';


export abstract class BaseEntity implements ICoreBaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}