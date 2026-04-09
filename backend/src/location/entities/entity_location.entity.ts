import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, Check } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum LocationType { REGISTERED = 'registered', OPERATIONAL_HQ = 'operational_hq', WAREHOUSE = 'warehouse', BRANCH_OFFICE = 'branch_office', SHOWROOM = 'showroom', DELIVERY_HUB = 'delivery_hub' }
export enum GeocodeStatus { PENDING = 'pending', VERIFIED = 'verified', FAILED = 'failed', MANUAL = 'manual' }
export enum VisibilityLevel { HIDDEN = 'hidden', COUNTRY_REGION = 'country_region', CITY = 'city', STREET_LEVEL = 'street_level', VERIFIED_MEMBERS = 'verified_members' }
export enum VerifiedMethod { KYB_MATCH = 'kyb_match', POSTCARD = 'postcard', DOCUMENT_UPLOAD = 'document_upload', MANUAL_ADMIN = 'manual_admin' }

@Entity('entity_locations')
@Index('idx_entity_locations_coordinates', ['coordinates'], { spatial: true })
@Index('idx_entity_locations_country', ['country_code', 'location_type', 'visibility'])
@Check(`country_code IN ('AT','BE','CY','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MT','PT','SK','SI','ES','NL','GB')`)
export class EntityLocation {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('uuid') entity_id: string;
  @ManyToOne(() => User, (user) => user.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entity_id' }) entity: User;
  @Column({ type: 'enum', enum: LocationType }) location_type: LocationType;
  @Column({ type: 'varchar', length: 100, nullable: true }) label: string;
  @Column({ type: 'varchar', length: 200 }) address_line1: string;
  @Column({ type: 'varchar', length: 200, nullable: true }) address_line2: string;
  @Column({ type: 'varchar', length: 100 }) city: string;
  @Column({ type: 'varchar', length: 100, nullable: true }) region: string;
  @Column({ type: 'varchar', length: 20 }) postal_code: string;
  @Column({ type: 'char', length: 2 }) country_code: string;
  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326, nullable: true }) coordinates: any;
  @Column({ type: 'enum', enum: GeocodeStatus, default: GeocodeStatus.PENDING }) geocode_status: GeocodeStatus;
  @Column({ type: 'varchar', length: 50, nullable: true }) geocode_provider: string;
  @Column({ type: 'numeric', precision: 3, scale: 2, nullable: true }) geocode_confidence: number;
  @Column({ type: 'smallint', nullable: true }) delivery_radius_km: number;
  @Column({ type: 'char', array: true, length: 2, nullable: true }) delivery_countries: string[];
  @Column({ type: 'enum', enum: VisibilityLevel, default: VisibilityLevel.HIDDEN }) visibility: VisibilityLevel;
  @Column({ type: 'boolean', default: false }) address_verified: boolean;
  @Column({ type: 'timestamptz', nullable: true }) verified_at: Date;
  @Column({ type: 'enum', enum: VerifiedMethod, nullable: true }) verified_method: VerifiedMethod;
  @Column({ type: 'boolean', default: false }) is_primary: boolean;
  @Column({ type: 'boolean', default: true }) is_active: boolean;
  @CreateDateColumn({ type: 'timestamptz' }) created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updated_at: Date;
}
