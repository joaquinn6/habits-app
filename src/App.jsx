import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AuthLayout from "./layouts/no-auth/NoAuth";
import DashboardLayout from "./layouts/dashboard/Dashboard";
//import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import SwitchTheme from "./components/SwitchTheme";
const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Rutas de autenticación */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas protegidas */}
          {/*<Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>
        */}
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
      <SwitchTheme />
    </ThemeProvider>
  );
};

export default App;
