import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "utils/Cookie";
import { transformEmployeeData } from "hooks/Manage.ts";

const auth = getCookie("Authorization");

// 직원 목록 조회
export const useEmployeeList = (storeId: string) => {
  return useQuery({
    queryKey: ["employees", storeId, auth],
    queryFn: async () => {
      const res = await axios.get(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/total`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
      return res.data;
    }
  });
};

// 직원 상세 조회
export const useEmployeeDetail = (storeId: string, emploId: string) => {
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
