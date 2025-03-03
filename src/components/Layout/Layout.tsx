import LoadingSpinner from "components/molecules/LoadingSpinner";
import { fetchEmployerMypage } from "hooks/api/StoreQuery";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStoreInfoStore } from "store/StoreStore";
import { getCookie } from "utils/Cookie";

const Layout = () => {
  const { pathname } = useLocation();
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
      } else if (
        !auth &&
        pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/signUp" &&
        pathname !== "/oauth/redirected/kakao"
      ) {
        navigate("/");
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
    } else if (
      !auth &&
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/signUp" &&
      pathname !== "/oauth/redirected/kakao"
    ) {
      navigate("/login");
    }
  }, [auth]);
  return <>{isLoading ? <LoadingSpinner /> : <Outlet />}</>;
};

export default Layout;
