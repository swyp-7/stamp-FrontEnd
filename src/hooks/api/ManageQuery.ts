import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { transformEmployeeData } from "hooks/Manage.ts";
import { useStoreInfoStore } from "store/StoreStore";

// 직원 목록 조회
export const useEmployeeList = (storeId: string, isModalActive: boolean) => {
  const { cookieData } = useStoreInfoStore();

  return useQuery({
    queryKey: ["employees", storeId, cookieData, isModalActive],
    queryFn: async () => {
      const res = await axios.get(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/total`,
        {
          headers: { Authorization: `Bearer ${cookieData}`, withCredentials: true }
        }
      );
      return res.data;
    }
  });
};

// 직원 상세 조회
export const useEmployeeDetail = (storeId: string, emploId: number) => {
  const { cookieData: auth } = useStoreInfoStore();

  return useQuery({
    queryKey: ["employeeDetail", storeId, auth, emploId],
    queryFn: async () => {
      const res = await axios.get(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/${emploId}`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
      return res.data;
    },
    enabled: !!emploId
  });
};

// 직원 저장
export const useAddEmployee = (storeId: string) => {
  const { cookieData: auth } = useStoreInfoStore();

  return useMutation({
    mutationFn: async (data: any) => {
      const transformedData = transformEmployeeData(data);

      return await axios.post(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/enroll`,
        transformedData,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            withCredentials: true
          }
        }
      );
    }
  });
};

// 직원 수정
export const useUpdateEmployee = () => {
  const { cookieData, storeData } = useStoreInfoStore();
  const storeId = storeData?.store.id || 0;

  return useMutation({
    mutationFn: async (data: any) => {
      const transformedData = transformEmployeeData(data);

      return await axios.put(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/${data.id}`,
        transformedData,
        {
          headers: {
            Authorization: `Bearer ${cookieData}`,
            withCredentials: true
          }
        }
      );
    }
  });
};

// 특정날짜에 근무하는 직원 조회
export const useFetchEmploByDays = (start: string, end: string) => {
  const { cookieData, storeData } = useStoreInfoStore();
  const storeId = storeData?.store.id || 0;

  return useQuery({
    queryKey: ["employees", storeId, start, end],
    queryFn: async () => {
      const res = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/period?startDate=${start}&endDate=${end}`,
        {
          headers: { Authorization: `Bearer ${cookieData}`, withCredentials: true }
        }
      );

      return res.data;
    },
    retry: false
  });
};

// 특정날짜 특정시간 근무 가능한 직원 조회
export const useFetchEmploByDayAndTime = (date: string, start: string, end: string) => {
  const { cookieData, storeData } = useStoreInfoStore();
  const storeId = storeData?.store.id || 0;

  return useQuery({
    queryKey: ["employees", storeId, start, end],
    queryFn: async () => {
      const res = await axios.get(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/available?date=${date}&startTime=${start}&endTime=${end}`,
        {
          headers: { Authorization: `Bearer ${cookieData}`, withCredentials: true }
        }
      );

      return res.data;
    },
    retry: false
  });
};
