import { Injectable } from '@angular/core';

export interface QuoteItem {
  name: string;
  qty: number;
  price: number; // Retail price (net)
  netPrice?: number; // Purchase price (net)
  markup?: number; // Markup %
}

export interface LaborItem {
  name: string;
  hours: number;
  rate: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteCalculatorService {
  calculateSubtotal(parts: QuoteItem[], labor: LaborItem[]): number {
    const partsSum = parts.reduce((sum, item) => sum + (item.qty || 0) * (item.price || 0), 0);
    const laborSum = labor.reduce((sum, item) => sum + (item.hours || 0) * (item.rate || 0), 0);
    return partsSum + laborSum;
  }

  calculateVat(subtotal: number, vatRate: number): number {
    if (isNaN(vatRate)) return 0;
    return subtotal * (vatRate / 100);
  }

  /**
   * Calculates retail price based on purchase price and markup
   */
  calculateRetailPrice(netPrice: number, markup: number): number {
    const safeNet = Math.max(0, netPrice);
    const safeMarkup = Math.max(0, markup);
    return Number((safeNet * (1 + safeMarkup / 100)).toFixed(2));
  }

  /**
   * Calculates markup % based on purchase price and desired retail price
   */
  calculateMarkup(netPrice: number, retailPrice: number): number {
    if (!netPrice || netPrice <= 0) return 0;
    if (retailPrice < netPrice) return 0;
    return Math.round(((retailPrice - netPrice) / netPrice) * 100);
  }
}
