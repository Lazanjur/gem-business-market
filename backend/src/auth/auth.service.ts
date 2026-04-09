import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, RegulatoryRegime } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly COUNTRY_CODES: Record<string, string> = {
    'Austria': 'AT', 'Belgium': 'BE', 'Bulgaria': 'BG', 'Croatia': 'HR', 'Cyprus': 'CY',
    'Czech Republic': 'CZ', 'Denmark': 'DK', 'Estonia': 'EE', 'Finland': 'FI', 'France': 'FR',
    'Germany': 'DE', 'Greece': 'GR', 'Hungary': 'HU', 'Ireland': 'IE', 'Italy': 'IT',
    'Latvia': 'LV', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Malta': 'MT', 'Netherlands': 'NL',
    'Poland': 'PL', 'Portugal': 'PT', 'Romania': 'RO', 'Slovakia': 'SK', 'Slovenia': 'SI',
    'Spain': 'ES', 'Sweden': 'SE', 'United Kingdom': 'GB',
  };

  async registerBusiness(dto: any, regime: RegulatoryRegime): Promise<any> {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('An account with this email already exists.');
    const password_hash = await bcrypt.hash(dto.password, 12);
    const countryName = dto.country_of_registration || dto.registration_country || '';
    const registration_country = (countryName.length === 2 ? countryName : this.COUNTRY_CODES[countryName]) || 'GB';
    const user: any = this.userRepo.create({
      company_name: dto.company_name,
      email: dto.email,
      password_hash,
      entity_type: dto.entity_type,
      regulatory_regime: regime,
      registration_number: dto.company_registration_number || dto.registration_number,
      vat_number: dto.vat_number || null,
      registration_country,
    });
    const saved: any = await this.userRepo.save(user);
    const { password_hash: _ph, ...result } = saved;
    return {
      user: result,
      access_token: this.jwtService.sign({ sub: saved.id, email: saved.email }),
    };
  }

  async login(email: string, password: string): Promise<any> {
    const user: any = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials.');
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Invalid credentials.');
    const { password_hash: _ph, ...result } = user;
    return {
      user: result,
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        verificationTier: user.verification_tier,
      }),
    };
  }
}
