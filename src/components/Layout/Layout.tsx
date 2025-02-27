import LoadingSpinner from "components/molecules/LoadingSpinner";
import { fetchEmployerMypage } from "hooks/api/StoreQuery";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreInfoStore } from "store/StoreStore";
import { getCookie } from "utils/Cookie";

const Layout = () => {
  const auth = getCookie("Authorization");
  const navigate = useNavigate();
  const { setStoreData, updateCookie } = useStoreInfoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 약간의 지연 후 쿠키 확인
    const timer = setTimeout(() => {
      const auth = getCookie("Authorization");

      if (auth) {
        updateCookie(auth);
        fetchEmployerMypage(auth).then((data) => {
          setStoreData(data?.data);
        });
      } else {
        navigate("/login");
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
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
  return <>{isLoading ? <LoadingSpinner /> : <Outlet />}</>;
};

export default Layout;
