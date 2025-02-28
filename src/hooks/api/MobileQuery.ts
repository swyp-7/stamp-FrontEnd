import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { useStoreInfoStore } from "store/StoreStore";

export const useFetchMobileLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.post<any>(
        "https://temp.api-stamp.p-e.kr/api/v1/auth/login/employee",
        data
      );
    }
  });
};
