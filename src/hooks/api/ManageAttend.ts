import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStoreInfoStore } from "store/StoreStore";

// 모든 직원 한달 출/퇴근 조회
export const fetchAllMonthAttend = (storeId: string, firstDate: string) => {
  const { cookieData: auth } = useStoreInfoStore();

  return useQuery({
    queryKey: ["monthOfAttendAll", storeId, auth, firstDate],
    queryFn: async () => {
      const res = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/attendance/month/all?firstDate=${firstDate}`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
      return res.data;
    },
    retry: false
  });
};

// 특정 직원 한달 출/퇴근 조회
export const fetchMonthAttend = (storeId: string, emploId: string, firstDate: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useQuery({
    queryKey: ["monthOfAttend", storeId, auth, firstDate],
    queryFn: async () => {
      const res = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/attendance/month/${emploId}?firstDate=${firstDate}`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
      return res.data;
    },
    retry: false
  });
};
