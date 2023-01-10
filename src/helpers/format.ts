export const i18nCurrencyFormat = (currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
};
