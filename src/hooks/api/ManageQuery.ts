import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "utils/Cookie";

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

export const useAddEmployee = (data: any, storeId: string) => {
  return useMutation({
    mutationFn: async () => {
      return await axios.post(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/enroll`,
        data,
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

const weekDayMap: Record<string, string> = {
  월요일: "Monday",
  화요일: "Tuesday",
  수요일: "Wednesday",
  목요일: "Thursday",
  금요일: "Friday",
  토요일: "Saturday",
  일요일: "Sunday"
};
