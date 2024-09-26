import { useEffect } from "react";
import { useSelector } from "react-redux";
import { apiCallPost } from "../containers/components/Axios/Axios";

let price = 0;

export function useTezosPrice() {
  const userId = useSelector((state) =>
  !state?.user?.profile?.error && Object.keys(state?.user?.profile).length > 0
      ? state?.user?.profile?.socialInfo[0]?.userId
      : null
  );
  useEffect(async () => {
  if(!price){  try {
      const res = await apiCallPost("/wallet/getUsdPrice", {
        payAmount: 1,
        fromCurrency: "USD",
        user_id: userId,
      });
      price = res.finalResponce[0].conversionAmount;
    } catch {}}
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return price;
}


