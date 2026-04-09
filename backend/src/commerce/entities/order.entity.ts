import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityLocation } from '../../location/entities/entity_location.entity';

export enum OrderStatus { PENDING = 'pending', PAID = 'paid', DISPATCHED = 'dispatched', DELIVERED = 'delivered', DISPUTED = 'disputed' }

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('uuid') buyer_id: string;
  @ManyToOne(() => User) @JoinColumn({ name: 'buyer_id' }) buyer: User;
  @Column('uuid') seller_id: string;
  @ManyToOne(() => User) @JoinColumn({ name: 'seller_id' }) seller: User;
  @Column({ type: 'numeric', precision: 12, scale: 2 }) total_amount: number;
  @Column({ type: 'char', length: 3 }) currency: string;
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING }) status: OrderStatus;
  @Column('uuid', { nullable: true }) dispatch_location_id: string;
  @ManyToOne(() => EntityLocation, { onDelete: 'SET NULL' }) @JoinColumn({ name: 'dispatch_location_id' }) dispatch_location: EntityLocation;
  @Column({ type: 'jsonb', nullable: true }) delivery_address: any;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updated_at: Date;
}
