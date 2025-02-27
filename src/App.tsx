import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginRedirect from "./pages/LoginRedirect";
import SignUp from "pages/SignUp";
import Main from "pages/Main";
import Manage from "pages/Manage/Manage";
import Schedule from "pages/Schedule";
import Notification from "pages/Notification";
import MyPage from "pages/MyPage";
import ManageAttend from "pages/Manage/ManageAttend";
import ManagePay from "pages/Manage/ManagePay";
import MobileLayout from "components/Layout/MobileLayout";
import MobileHome from "pages/Mobile/MobileHome";
import MobileMain from "pages/Mobile/MobileMain";
import MobileLogin from "pages/Mobile/MobileLogin";
import MobileSchedule from "pages/Mobile/MobileSchedule";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "oauth/redirected/kakao", element: <LoginRedirect /> },
      { path: "signUp", element: <SignUp /> },
      { path: "my-store", element: <Main /> },
      { path: "management/register", element: <Manage /> },
      { path: "management/attend", element: <ManageAttend /> },
      { path: "management/pay", element: <ManagePay /> },
      { path: "schedule", element: <Schedule /> },
      { path: "notification", element: <Notification /> },
      { path: "my-page", element: <MyPage /> }
    ]
  },
  {
    path: "/m",
    element: <MobileLayout />,
    children: [
      { path: "", element: <MobileHome /> },
      { path: "main", element: <MobileMain /> },
      { path: "login", element: <MobileLogin /> },
      { path: "schedule", element: <MobileSchedule /> }
    ]
  }
]);

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
