import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityLocation, GeocodeStatus } from './entities/entity_location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(EntityLocation)
    private readonly locationRepo: Repository<EntityLocation>,
  ) {}

  async createLocation(entityId: string, userId: string, createDto: any): Promise<EntityLocation> {
    const location = this.locationRepo.create({ ...createDto, entity_id: entityId });
    return this.locationRepo.save(location);
  }

  async findNearbySuppliers(lat: number, lng: number, radiusKm: number, tier: string): Promise<EntityLocation[]> {
    return this.locationRepo
      .createQueryBuilder('loc')
      .where(
        `ST_DWithin(loc.coordinates::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)`,
        { lat, lng, radius: radiusKm * 1000 },
      )
      .getMany();
  }

  async updateCoordinates(locationId: string, coords: [number, number], confidence: number, provider: string): Promise<void> {
    await this.locationRepo.update(locationId, {
      coordinates: () => `ST_SetSRID(ST_MakePoint(${coords[0]}, ${coords[1]}), 4326)`,
      geocode_confidence: confidence,
      geocode_provider: provider,
      geocode_status: GeocodeStatus.VERIFIED,
    });
  }

  async markForManualReview(locationId: string): Promise<void> {
    await this.locationRepo.update(locationId, { geocode_status: GeocodeStatus.MANUAL });
  }
}
