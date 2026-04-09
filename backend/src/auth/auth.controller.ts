import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EntityType, RegulatoryRegime } from '../users/entities/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: any) {
    if (registerDto.entity_type === 'individual') {
      throw new BadRequestException('Consumer registrations are strictly prohibited on this platform.');
    }
    const regime = registerDto.country_code === 'GB' ? RegulatoryRegime.UK : RegulatoryRegime.EU;
    return this.authService.registerBusiness(registerDto, regime);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password_hash);
  }
}
