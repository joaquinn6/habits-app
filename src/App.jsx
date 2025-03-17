import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/no-auth/NoAuth";
import SwitchTheme from "./components/SwitchTheme";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/dashboard/Dashboard";

import About from "./pages/About";
import Home from "./pages/home/Home";
import HomePage from "./pages/HomePage";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Habit from "./pages/habit/Habit";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Calendar from "./pages/calendar/Calendar";
import Stats from "./pages/stats/Stats";
const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/home-page" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/habit" element={<Habit />} />
                <Route path="/habit/:id" element={<Habit />} />
                <Route path="/habit/:id/calendar" element={<Calendar />} />
                <Route path="/habit/:id/stats" element={<Stats />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>

            {/* Rutas de autenticación */}
            <Route element={<PublicRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="/" element={<HomePage />} />
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
