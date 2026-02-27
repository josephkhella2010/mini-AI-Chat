import { useNavigate } from "react-router-dom";

export default function NavigationContainer() {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/register")}>Register</li>
        <li onClick={() => navigate("/login")}>Login</li>
      </ul>
    </div>
  );
}
