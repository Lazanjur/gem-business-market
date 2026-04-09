import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TenderStatus { PUBLISHED = 'published', EVALUATION = 'evaluation', AWARDED = 'awarded', CANCELLED = 'cancelled' }

@Entity('tenders')
export class Tender {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('uuid') contracting_authority_id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'contracting_authority_id' }) contracting_authority: User;
  @Column({ type: 'varchar', length: 255 }) title: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true }) budget: number;
  @Column({ type: 'enum', enum: TenderStatus, default: TenderStatus.PUBLISHED }) status: TenderStatus;
  @Column({ type: 'timestamptz' }) deadline_at: Date;
  @Column({ type: 'geography', spatialFeatureType: 'Polygon', srid: 4326, nullable: true }) geo_eligibility_polygon: any;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updated_at: Date;
}
