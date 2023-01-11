import { GiftcardType } from "../types/giftcards";
import { i18nCurrencyFormat } from "./format";

export const getDenominationRange = (giftcard: GiftcardType | null) => {
  if (
    giftcard?.denominationType === "FIXED" &&
    giftcard?.fixedRecipientDenominations?.length === 1
  ) {
    return i18nCurrencyFormat(giftcard?.recipientCurrencyCode).format(
      giftcard?.fixedRecipientDenominations![0]
    );
  }
  return giftcard?.denominationType === "FIXED"
    ? `${i18nCurrencyFormat(giftcard?.recipientCurrencyCode).format(
        giftcard?.fixedRecipientDenominations![0]
      )}-
              ${i18nCurrencyFormat(giftcard?.recipientCurrencyCode).format(
                giftcard?.fixedRecipientDenominations![
                  giftcard?.fixedRecipientDenominations!.length - 1
                ]
              )}`
    : giftcard?.denominationType === "RANGE"
    ? `${i18nCurrencyFormat(giftcard?.recipientCurrencyCode).format(
        giftcard?.minRecipientDenomination
      )} - ${i18nCurrencyFormat(giftcard?.recipientCurrencyCode).format(
        giftcard?.maxRecipientDenomination
      )}`
    : "";
};
