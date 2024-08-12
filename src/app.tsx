import { AuthProvider } from "./context/auth-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { Toaster } from "./components/ui/toaster";
import Todos from "./pages/todos";
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/entrar",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastrar",
    element: <Register />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/todos",
        element: <Todos />,
      },
    ]
  }
])

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
