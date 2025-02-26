import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AuthLayout from "./layouts/no-auth/NoAuth";
import DashboardLayout from "./layouts/dashboard/Dashboard";
import SwitchTheme from "./components/SwitchTheme";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/home/Home";
import About from "./pages/About";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Habit from "./pages/habit/Habit";
import { NotificationProvider } from "./context/NotificationContext";
const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/habit" element={<Habit />} />
                <Route path="/habit/:id" element={<Habit />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>

            {/* Rutas de autenticación */}
            <Route element={<PublicRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        <SwitchTheme />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
