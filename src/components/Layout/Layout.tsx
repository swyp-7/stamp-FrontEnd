import { fetchEmployerMypage } from "hooks/StoreQuery";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStoreInfoStore } from "store/StoreStore";
import { getCookie } from "utils/Cookie";

const Layout = () => {
  const auth = getCookie("Authorization");
  const { setStoreData } = useStoreInfoStore();
  useEffect(() => {
    if (auth) {
      fetchEmployerMypage(auth).then((data) => {
        setStoreData(data?.data);
      });
    }
  }, [auth]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
