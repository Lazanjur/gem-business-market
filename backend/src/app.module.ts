import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

import { User } from './users/entities/user.entity';
import { EntityLocation } from './location/entities/entity_location.entity';
import { Listing } from './commerce/entities/listing.entity';
import { Order } from './commerce/entities/order.entity';
import { Tender } from './b2g/entities/tender.entity';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { GeocodingProviderService } from './location/geocoding-provider.service';
import { GeocodingWorker } from './location/workers/geocoding.worker';
import { SearchController } from './search/search.controller';
import { ChatGateway } from './chat/chat.gateway';
import { VatService } from './payments/vat.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HttpModule,
    PassportModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'ib_admin'),
        password: configService.get<string>('DB_PASSWORD', 'ib_secret'),
        database: configService.get<string>('DB_NAME', 'ib_marketplace'),
        entities: [User, EntityLocation, Listing, Order, Tender],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, EntityLocation, Listing, Order, Tender]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'fallback_secret'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '1d') },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'geocoding-queue' }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>('ELASTICSEARCH_NODE', 'http://localhost:9200'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, LocationController, SearchController],
  providers: [AuthService, JwtStrategy, LocationService, GeocodingProviderService, GeocodingWorker, ChatGateway, VatService],
})
export class AppModule {}
