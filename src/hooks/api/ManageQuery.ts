import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "utils/Cookie";
import { transformEmployeeData } from "hooks/Manage.ts";

const auth = getCookie("Authorization");

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
