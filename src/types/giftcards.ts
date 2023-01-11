export type GiftcardType = {
  available: boolean;
  brand: { brandId: number; brandName: string };
  chi_pvd: string;
  code: string;
  country: {
    isoName: string;
    name: string;
    flagUrl: string;
  };
  countryCode: string;
  denominationType: string;
  description: string;
  fixedRecipientDenominations?: number[];
  fixedRecipientToSenderDenominationsMap?: null;
  fixedSenderDenominations?: null;
  global: boolean;
  img: string;
  logoUrls: string[];
  maxRecipientDenomination: number;
  maxSenderDenomination: number;
  minRecipientDenomination: number;
  minSenderDenomination: number;
  name: string;
  productId: number;
  productName: string;
  recipientCurrencyCode: string;
  redeemInstruction: {
    concise: string;
    verbose: string;
  };
  senderCurrencyCode: string;
  senderFee: number;
  senderFeePercentage: number;
  type: string;
  cartQuantity?: number;
};
