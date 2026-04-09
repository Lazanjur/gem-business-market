import { Process, Processor, OnQueueFailed } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { LocationService } from '../location.service';
import { GeocodingProviderService } from '../geocoding-provider.service';

@Processor('geocoding-queue')
export class GeocodingWorker {
  private readonly logger = new Logger(GeocodingWorker.name);
  constructor(private readonly geoProvider: GeocodingProviderService, private readonly locationService: LocationService) {}

  @Process('geocode-address')
  async handleGeocodingProcess(job: Job<{ locationId: string; addressString: string }>) {
    const { locationId, addressString } = job.data;
    try {
      let result = await this.geoProvider.geocodeWithGoogle(addressString);
      if (!result.success || result.confidence < 0.85) {
        const fallback = await this.geoProvider.geocodeWithHere(addressString);
        if (fallback.success && fallback.confidence > result.confidence) result = fallback;
      }
      if (result.success && result.confidence >= 0.70) {
        const [lng, lat] = result.coordinates.coordinates;
        await this.locationService.updateCoordinates(locationId, [lng, lat], result.confidence, result.provider);
      } else {
        await this.locationService.markForManualReview(locationId);
      }
    } catch (error: any) {
      this.logger.error(`Geocoding error: ${error.message}`);
      await this.locationService.markForManualReview(locationId);
    }
  }
}
