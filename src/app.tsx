import { AuthProvider } from "./context/auth-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Todos from "./pages/todos";
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/entrar",
    element: <Login />,
  },
  {
    path: "/cadastrar",
    element: <Register />,
  },
  {
    path: "/todos",
    element: <Todos />,
  }
])

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
