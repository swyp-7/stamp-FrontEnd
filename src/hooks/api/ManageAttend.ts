import { useMutation, useQuery } from "@tanstack/react-query";
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
  const { cookieData: auth } = useStoreInfoStore();

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

// 직원 전용 한달 출/퇴근 조회
export const fetchMyMonthAttend = (firstDate: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useQuery({
    queryKey: ["myMonthOfAttend", auth, firstDate],
    queryFn: async () => {
      const res = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/employee/attendance/month?firstDate=${firstDate}`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
      return res.data;
    },
    retry: false
  });
};

// 출근 처리
export const fetchGoToWork = (storeId: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useMutation({
    mutationFn: async (authCode: string) => {
      return await axios.post(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/punchIn`,
        { authCode: authCode },
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
    }
  });
};
// 퇴근처리
export const fetchLeaveToWork = (storeId: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useMutation({
    mutationFn: async (authCode: string) => {
      return await axios.post(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/punchOut`,
        { authCode: authCode },
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
    }
  });
};

// 추가근무요청
export const fetchReqExtra = (employeeId: string) => {
  const { cookieData: auth, storeData } = useStoreInfoStore();
  const storeId = storeData?.store?.id || 0;

  return useMutation({
    mutationFn: async (date: string) => {
      return await axios.post(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/extraShifts/createRequest/${employeeId}`,
        { requestDate: date },
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
    }
  });
};

// 요청받은 추가근무 조회
export const getReqExtra = (storeId: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useQuery({
    queryKey: ["resExtra"],
    queryFn: async () => {
      const res = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/extraShifts/getRequests`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );

      return res.data;
    }
  });
};

// 추가근무 수락
export const fetchReqExtraOk = (storeId: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useMutation({
    mutationFn: async (extraShiftId: string) => {
      return await axios.put(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/extraShifts/${extraShiftId}/acceptRequest`,
        {},
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
    }
  });
};

// 추가근무 거절
export const fetchReqExtraNo = (storeId: string) => {
  const { mobileCookieData: auth } = useStoreInfoStore();

  return useMutation({
    mutationFn: async (extraShiftId: string) => {
      return await axios.put(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/extraShifts/${extraShiftId}/rejectRequest`,
        {},
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
    }
  });
};
