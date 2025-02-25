// import { useFetchMyInfo } from "hooks/StoreQuery";
import { fetchEmployerMypage } from "hooks/StoreQuery";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "utils/Cookie";

const Layout = () => {
  const auth = getCookie("Authentication");
  // const { mutate } = useFetchMyInfo();
  useEffect(() => {
    if (auth) {
      // mutate(auth);
      fetchEmployerMypage(
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiZW1haWwiOiJlbmdoMDIwNUBnbWFpbC5jb20iLCJjb250YWN0IjoiMDEwLTY2MzctODYzMiIsInJvbGVzIjoiRW1wbG95ZXIiLCJpYXQiOjE3NDA0ODkzMTYsImV4cCI6MTc0MDQ5NjUxNn0.Gt2_De74Rrv2MSUu888djSDRjS2qds7FOFYnPGOVGDrZn3nW5VhsESnCzOJPDy8Mf-QRTM1FUTXSnVGeHmj45Q"
      ).then((data) => {
        console.log(data);
      });
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
