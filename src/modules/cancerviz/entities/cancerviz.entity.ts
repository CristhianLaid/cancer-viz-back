import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ICancerDataModelBase } from "../interfaces/cancerviz.interface";

@Entity()
export class Cancerviz implements ICancerDataModelBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    projectId: string;
    
    @Column()
    cancerType: string;

    @Column()
    dataSource: string;

    @Column()
    accessionNo: string;

    @Column()
    country: string;

    @Column()
    sampleId: string;

    @Column()
    sampleType: string;

    @Column()
    constructionProtocol: string;

    @Column()
    transcriptomeAnalysis: string;

    @Column()
    metabolicProfile: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
};
