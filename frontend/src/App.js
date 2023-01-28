import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./user/pages/Login";
import Home from "./user/pages/Home";
import Signup from "./user/pages/Signup";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.UserLogin.user);
  const admin = useSelector((state) => state.AdminAuth.admin);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/admin"
            element={admin ? <AdminHome /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/login"
            element={admin ? <Navigate to="/admin" /> : <AdminLogin />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
