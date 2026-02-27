import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import RegisterPage from "../register/RegisterPage";
import NavigationContainer from "../navigation/navigationContainer";

export default function RoutesPage() {
  return (
    <div>
      <NavigationContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  );
}
