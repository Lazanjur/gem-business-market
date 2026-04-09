import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, UploadedFile, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocationService } from './location.service';

@Controller('api/v1')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('entities/:id/locations')
  async createLocation(@Param('id') entityId: string, @Body() createDto: any, @Request() req: any) {
    return this.locationService.createLocation(entityId, req.user.userId, createDto);
  }

  @Get('marketplace/search/suppliers/nearby')
  async searchNearbySuppliers(@Query('lat') lat: number, @Query('lng') lng: number, @Query('radius_km') radiusKm: number, @Request() req: any) {
    return this.locationService.findNearbySuppliers(lat, lng, radiusKm, req.user.verificationTier);
  }
}
