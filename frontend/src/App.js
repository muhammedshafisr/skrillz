import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./user/pages/login";
import Home from "./user/pages/home";
import Signup from "./user/pages/signup";
import AdminLogin from "./admin/pages/adminLogin";
import AdminHome from "./admin/pages/adminHome";
import User from "./admin/pages/userManagement";
import Profile from "./user/pages/profile";
import EditProfile from "./user/pages/editProfile";
import EditUser from "./admin/pages/editUser";
import { useSelector } from "react-redux";
import SearchList from "./user/pages/searchList";
import VerifyOtp from "./user/pages/verifyOtp";

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
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/edit_profile"
            element={user ? <EditProfile /> : <Navigate to="/" />}
          />
          <Route path="/search" element={<SearchList />} />
          
          {/* <Route path="/verify" element={ user ? <Navigate to="/"/> : < VerifyOtp/> } /> */}

          {/* admin routes */}

          <Route
            path="/admin"
            element={admin ? <AdminHome /> : <Navigate to="/admin/login" />}
          />
          <Route
            path="/admin/login"
            element={admin ? <Navigate to="/admin" /> : <AdminLogin />}
          />
          <Route
            path="/admin/user"
            element={admin ? <User /> : <AdminLogin />}
          />
          <Route
            path="/admin/user/edit_user/:id"
            element={admin ? <EditUser /> : <AdminLogin />}
          />

          {/* 404 not found */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
