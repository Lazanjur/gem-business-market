import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityLocation } from '../../location/entities/entity_location.entity';

export enum ListingStatus { DRAFT = 'draft', ACTIVE = 'active', PAUSED = 'paused', ARCHIVED = 'archived' }

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('uuid') seller_id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'seller_id' }) seller: User;
  @Column({ type: 'varchar', length: 255 }) title: string;
  @Column({ type: 'text' }) description: string;
  @Column({ type: 'integer' }) category_id: number;
  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true }) price: number;
  @Column({ type: 'char', length: 3, default: 'EUR' }) currency: string;
  @Column({ type: 'enum', enum: ListingStatus, default: ListingStatus.DRAFT }) status: ListingStatus;
  @Column('uuid', { nullable: true }) dispatch_location_id: string;
  @ManyToOne(() => EntityLocation, { onDelete: 'SET NULL' }) @JoinColumn({ name: 'dispatch_location_id' }) dispatch_location: EntityLocation;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updated_at: Date;
}
