import { Injectable, Logger, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { RegulatoryRegime } from '../users/entities/user.entity';

@Injectable()
export class KybVerificationService {
  private readonly logger = new Logger(KybVerificationService.name);
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  async executeVerification(regNumber: string, countryCode: string, regime: RegulatoryRegime) {
    this.logger.log(`Initiating KYB check for ${regNumber} in ${countryCode} under ${regime} regime.`);
    try {
      if (regime === RegulatoryRegime.UK) {
        return await this.verifyCompaniesHouse(regNumber);
      } else {
        return await this.verifyCreditsafe(regNumber, countryCode);
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('External registry verification service is currently unavailable.');
    }
  }

  private async verifyCompaniesHouse(companyNumber: string) {
    const apiKey = this.configService.get<string>('COMPANIES_HOUSE_API_KEY');
    const authHeader = `Basic ${Buffer.from(apiKey + ':').toString('base64')}`;
    const url = `https://api.company-information.service.gov.uk/company/${companyNumber}`;
    try {
      const response = await lastValueFrom(this.httpService.get(url, { headers: { Authorization: authHeader } }));
      const data = response.data;
      if (data.company_status !== 'active') throw new UnauthorizedException('UK Company is not active.');
      return {
        isVerified: true, companyName: data.company_name,
        registeredAddress: { address_line1: data.registered_office_address.address_line_1, city: data.registered_office_address.locality, postal_code: data.registered_office_address.postal_code, country_code: 'GB' }
      };
    } catch (err: any) {
      if (err.response?.status === 404) throw new UnauthorizedException('UK Company Number not found.');
      throw err;
    }
  }

  private async verifyCreditsafe(regNumber: string, countryCode: string) {
    const url = `https://connect.creditsafe.com/v1/companies?regNo=${regNumber}&countries=${countryCode}`;
    const response = await lastValueFrom(this.httpService.get(url, { headers: { Authorization: `Bearer MOCK_TOKEN` } }));
    const companies = response.data.companies;
    if (!companies || companies.length === 0) throw new UnauthorizedException('Entity not found in EU Creditsafe database.');
    return {
      isVerified: true, companyName: companies[0].name, vatNumber: companies[0].vatNo,
      registeredAddress: { address_line1: companies[0].address.street, city: companies[0].address.city, postal_code: companies[0].address.postCode, country_code: countryCode.toUpperCase() }
    };
  }
}
