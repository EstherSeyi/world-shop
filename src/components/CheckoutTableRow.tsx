import { useMemo } from "react";

import dummyData from "../assets/data.json";
import { i18nCurrencyFormat } from "../helpers/format";

const CheckoutTableRow = ({ orderItem }: any) => {
  const assetDetails = useMemo(
    () => dummyData.data.benefitsList.find((item) => item.id === orderItem.id),
    [orderItem.id]
  );
  return (
    <div className="flex border-b border-grey py-1 mb-2">
      <p className=" basis-3/6 overflow-ellipsis">
        {assetDetails?.name}

        <span className="sm:hidden">({orderItem.quantity})</span>
      </p>
      <p className="hidden sm:block basis-1/6">{orderItem.quantity}</p>
      <p className="basis-2/6">
        {i18nCurrencyFormat(assetDetails?.currency ?? "USD").format(
          Number(assetDetails?.price) * orderItem.quantity!
        )}
      </p>
    </div>
  );
};

export default CheckoutTableRow;
