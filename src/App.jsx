import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AuthLayout from "./layouts/no-auth/NoAuth";
import DashboardLayout from "./layouts/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import SwitchTheme from "./components/SwitchTheme";
import { NotificationProvider } from "./context/NotificationContext";
const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Rutas de autenticación */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Route>

            {/* <Route element={<DashboardLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route> */}
          </Routes>
        </Router>
        <SwitchTheme />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
