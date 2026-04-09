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

  async registerBusiness(dto: any, regime: RegulatoryRegime): Promise<any> {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('An account with this email already exists.');
    const password_hash = await bcrypt.hash(dto.password, 12);
    const user: any = this.userRepo.create({ ...dto, password_hash, regulatory_regime: regime });
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
