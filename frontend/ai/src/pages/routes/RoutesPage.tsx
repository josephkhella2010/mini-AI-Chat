import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import RegisterPage from "../register/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginMainPage from "../login/LoginMainPage";
import NavigationContainer from "../navigation/NavigationMainContainer";
import SettingUserPage from "../settingUserPage/SettingUserPage";
export default function RoutesPage() {
  return (
    <div>
      <Router>
        <NavigationContainer />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginMainPage />} />
          <Route path="/user-setting/:userId" element={<SettingUserPage />} />
        </Routes>
      </Router>
    </div>
  );
}
