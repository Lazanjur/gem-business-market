import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export interface GeocodingResult {
  success: boolean;
  coordinates: { type: string; coordinates: [number, number] };
  confidence: number;
  provider: string;
}

@Injectable()
export class GeocodingProviderService {
  private readonly logger = new Logger(GeocodingProviderService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async geocodeWithGoogle(address: string): Promise<GeocodingResult> {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      const res = await lastValueFrom(this.httpService.get(url));
      const result = res.data.results?.[0];
      if (!result) return { success: false, coordinates: { type: 'Point', coordinates: [0, 0] }, confidence: 0, provider: 'google' };
      const { lat, lng } = result.geometry.location;
      const confidence = result.geometry.location_type === 'ROOFTOP' ? 0.95 : result.geometry.location_type === 'RANGE_INTERPOLATED' ? 0.80 : 0.65;
      return { success: true, coordinates: { type: 'Point', coordinates: [lng, lat] }, confidence, provider: 'google' };
    } catch (err: any) {
      this.logger.error(`Google geocoding failed: ${err.message}`);
      return { success: false, coordinates: { type: 'Point', coordinates: [0, 0] }, confidence: 0, provider: 'google' };
    }
  }

  async geocodeWithHere(address: string): Promise<GeocodingResult> {
    try {
      const apiKey = this.configService.get<string>('HERE_MAPS_API_KEY');
      const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
      const res = await lastValueFrom(this.httpService.get(url));
      const item = res.data.items?.[0];
      if (!item) return { success: false, coordinates: { type: 'Point', coordinates: [0, 0] }, confidence: 0, provider: 'here' };
      const { lat, lng } = item.position;
      const confidence = item.resultType === 'houseNumber' ? 0.90 : 0.70;
      return { success: true, coordinates: { type: 'Point', coordinates: [lng, lat] }, confidence, provider: 'here' };
    } catch (err: any) {
      this.logger.error(`HERE geocoding failed: ${err.message}`);
      return { success: false, coordinates: { type: 'Point', coordinates: [0, 0] }, confidence: 0, provider: 'here' };
    }
  }
}
