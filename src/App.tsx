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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "login/redirect", element: <LoginRedirect /> },
      { path: "signUp", element: <SignUp /> },
    ],
  },
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
