import { fetchEmployerMypage } from "hooks/api/StoreQuery";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreInfoStore } from "store/StoreStore";
import { getCookie } from "utils/Cookie";

const Layout = () => {
  const auth = getCookie("Authorization");
  const navigate = useNavigate();
  const { setStoreData } = useStoreInfoStore();
  useEffect(() => {
    if (auth) {
      fetchEmployerMypage(auth).then((data) => {
        setStoreData(data?.data);
      });
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (auth) {
      fetchEmployerMypage(auth).then((data) => {
        setStoreData(data?.data);
      });
    } else {
      navigate("/login");
    }
  }, [auth]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
