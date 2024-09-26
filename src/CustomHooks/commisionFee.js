import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiCallGet } from "../containers/components/Axios/Axios";
import { setCommisionFee, setTransactionFee } from "../Redux/Reducers/user";

export function useCommisionFee() {
  const dispatch = useDispatch();
  useEffect(async () => {
    // try {
    //   const res = await apiCallGet(`users/api/v1/nft/nft_fees`);

    //   if (res) {
    //     dispatch(setCommisionFee(res.data));
    //   }
    // } catch {}
    // try {
    //   const res = await apiCallGet(`users/api/v1/nft/transaction_fees`);

    //   if (res) {
    //     dispatch(setTransactionFee(res.data));
    //   }
    // } catch {}

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
