import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Check, OneToMany } from 'typeorm';
import { EntityLocation } from '../../location/entities/entity_location.entity';

export enum RegulatoryRegime { EU = 'eu', UK = 'uk' }
export enum VerificationTier { BASIC = 'basic', STANDARD = 'standard', PREMIUM = 'premium', PUBLIC_AUTHORITY = 'public_authority' }
export enum EntityType { LIMITED_COMPANY = 'limited_company', PUBLIC_LIMITED = 'public_limited', SOLE_TRADER = 'sole_trader', PUBLIC_AUTHORITY = 'public_authority' }

@Entity('users')
@Check(`entity_type != 'individual'`)
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 255 }) company_name: string;
  @Column({ type: 'varchar', length: 100, unique: true }) email: string;
  @Column({ type: 'varchar', length: 255 }) password_hash: string;
  @Column({ type: 'enum', enum: EntityType }) entity_type: EntityType;
  @Column({ type: 'enum', enum: RegulatoryRegime }) regulatory_regime: RegulatoryRegime;
  @Column({ type: 'enum', enum: VerificationTier, default: VerificationTier.BASIC }) verification_tier: VerificationTier;
  @Column({ type: 'varchar', length: 50, nullable: true }) registration_number: string;
  @Column({ type: 'varchar', length: 50, nullable: true }) vat_number: string;
  @Column({ type: 'char', length: 2 }) registration_country: string;
  @Column({ type: 'boolean', default: true }) is_active: boolean;
  @OneToMany(() => EntityLocation, (location) => location.entity) locations: EntityLocation[];
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updated_at: Date;
}
