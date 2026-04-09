import { Controller, Get, Query, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerificationTier } from '../users/entities/user.entity';

@Controller('api/v1/marketplace/search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly esService: ElasticsearchService) {}

  @Get('listings')
  async searchListings(@Query('q') q: string, @Query('lat') lat: number, @Query('lng') lng: number, @Query('radius_km') radiusKm: number, @Request() req: any) {
    const filterConditions: any[] = [];
    if (lat && lng && radiusKm) {
      filterConditions.push({
        geo_distance: { distance: `${radiusKm}km`, dispatch_location: { lat: Number(lat), lon: Number(lng) } }
      });
    }
    const { hits } = await this.esService.search({
      index: 'marketplace_listings',
      query: { bool: { must: q ? [{ multi_match: { query: q, fields: ['title^3', 'description'] } }] : [], filter: filterConditions } },
      sort: (lat && lng && radiusKm) ? [{ _geo_distance: { dispatch_location: { lat: Number(lat), lon: Number(lng) }, order: 'asc', unit: 'km' } }] : [{ _score: { order: 'desc' } }]
    });

    return {
      data: hits.hits.map(hit => {
        const source: any = hit._source;
        if (req.user.verificationTier === VerificationTier.BASIC && source.dispatch_location) {
          delete source.dispatch_location.lat; delete source.dispatch_location.lon;
        }
        return { ...source, distance_km: hit.sort ? Math.round((hit.sort[0] as number) * 10) / 10 : undefined };
      })
    };
  }
}
