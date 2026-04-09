import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class VatService {
  async calculateB2bVat(netAmount: number, buyerVat: string, deliveryCountry: string, dispatchCountry: string) {
    if (!dispatchCountry) throw new BadRequestException('Dispatch location required.');
    if (dispatchCountry === deliveryCountry) {
      return { net_amount: netAmount, vat_amount: netAmount * 0.20, gross_amount: netAmount * 1.20, is_reverse_charge: false, supply_country: dispatchCountry };
    }
    if (this.isEuMember(dispatchCountry) && this.isEuMember(deliveryCountry) && buyerVat) {
      return { net_amount: netAmount, vat_amount: 0, gross_amount: netAmount, is_reverse_charge: true, supply_country: dispatchCountry };
    }
    return { net_amount: netAmount, vat_amount: 0, gross_amount: netAmount, is_reverse_charge: false, supply_country: dispatchCountry };
  }

  private isEuMember(code: string) {
    return ['AT','BE','CY','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MT','PT','SK','SI','ES','NL'].includes(code.toUpperCase());
  }
}
