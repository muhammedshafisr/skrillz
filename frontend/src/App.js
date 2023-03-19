import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./user/pages/login";
import Home from "./user/pages/home";
import Signup from "./user/pages/signup";
import AdminLogin from "./admin/pages/adminLogin";
import AdminDashBoard from "./admin/pages/adminDashboard";
import User from "./admin/pages/userManagement";
import Profile from "./user/pages/profile";
import EditProfile from "./user/pages/editProfile";
import EditUser from "./admin/pages/editUser";
import { useSelector } from "react-redux";
import SearchList from "./user/pages/searchList";
import VerifyOtp from "./user/pages/verifyOtp";
import ViewVideo from "./user/pages/viewVideo";
import Followers from "./user/pages/following";
import LiveStream from "./user/pages/liveStream";
import Community from "./user/pages/community";
import CreateCommunity from "./user/pages/createCommunity";
import CommunityChat from "./user/pages/communitySingleChat";
import LikedVideos from "./user/pages/likedVideos";
import History from "./user/pages/history";
import UserVideos from "./admin/pages/userVideos"
import Reports from "./admin/pages/repots";
import VideoSingleView from "./admin/pages/userVideosSingleView";
import ViewReports from "./admin/pages/viewReports";
import Communities from "./admin/pages/commuinities";
import Live from "./admin/pages/live";
import Videos from "./admin/pages/videos";
import AdminSearchList from "./admin/pages/searchList";
import NotFound from "./404";
import Genre from "./user/pages/genre";

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
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/edit_profile"
            element={user ? <EditProfile /> : <Navigate to="/login" />}
          />

          <Route
            path="/followers"
            element={user ? <Followers /> : <Navigate to="/login" />}
          />

          <Route path="/search" element={<SearchList />} />

          <Route path="/view_video/:id" element={<ViewVideo />} />

          <Route path="/community"
          element= {user? <Community /> : <Navigate to = "/login" />}
          />

          <Route path="/community/create_community"
          element= {user? <CreateCommunity /> : <Navigate to = "/login" />}
          />

          <Route path="/chat/:id"
          element= {user? <CommunityChat /> : <Navigate to = "/login" />}
          />

          <Route
            path="/live_now"
            element={user ? <LiveStream /> : <Navigate to="/login" />}
          />

          <Route
            path="/likedVideos"
            element={user ? <LikedVideos /> : <Navigate to="/login" />}
          />
          
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/login" />}
          />
          <Route
            path="/genre"
            element={user ? <Genre /> : <Navigate to="/login" />}
          />

          {/* <Route path="/verify" element={ user ? <Navigate to="/"/> : < VerifyOtp/> } /> */}

          {/* admin routes */}

          <Route
            path="/admin"
            element={admin ? <AdminDashBoard /> : <Navigate to="/admin/login" />}
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
          <Route
            path="/admin/user/:id"
            element={admin ? <UserVideos /> : <AdminLogin />}
          />
          <Route
            path="/admin/reports"
            element={admin ? <Reports /> : <AdminLogin />}
          />
          <Route
            path="/admin/user/view_video/:id"
            element={admin ? <VideoSingleView /> : <AdminLogin />}
          />
          <Route
            path="/admin/reports/viewDetails/:id"
            element={admin ? <ViewReports /> : <AdminLogin />}
          />
          <Route
            path="/admin/communities"
            element={admin ? <Communities /> : <AdminLogin />}
          />
          <Route
            path="/admin/live"
            element={admin ? <Live /> : <AdminLogin />}
          />
          <Route
            path="/admin/videos"
            element={admin ? <Videos /> : <AdminLogin />}
          />
          <Route
            path="/admin/search/:name"
            element={admin ? <AdminSearchList /> : <AdminLogin />}
          />

          {/* 404 not found */}

          <Route path="*" element={ <NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
