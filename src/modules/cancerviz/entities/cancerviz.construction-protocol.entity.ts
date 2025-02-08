import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IUniqueKey } from "../interfaces/uniqueKey.interface";

@Entity()
export class ConstructionProtocol implements IUniqueKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
