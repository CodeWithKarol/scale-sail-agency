export type CurrencyCode = 'EUR';

export interface Money {
  /**
   * Price in minor units (e.g. cents) to avoid float issues.
   * Example: €9.99 => 999
   */
  readonly amountMinor: number;
  readonly currency: CurrencyCode;

  /**
   * Optional display override for cases like "€0+" (pay-what-you-want).
   * If set, UI should render this label instead of formatting amountMinor.
   */
  readonly label?: string;
}

export interface ScaleSailTemplate {
  readonly id: string;
  readonly name: string;
  readonly bestFor: readonly string[];
  readonly description: string;
  readonly chips: readonly string[];

  /** Gumroad product URL */
  readonly buyUrl: string;

  /** Optional live preview URL (hide button if absent) */
  readonly previewUrl?: string;

  readonly price: Money;
}
