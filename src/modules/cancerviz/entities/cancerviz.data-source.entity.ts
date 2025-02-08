import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IUniqueKey } from "../interfaces/uniqueKey.interface";

@Entity()
export class DataSource implements IUniqueKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
