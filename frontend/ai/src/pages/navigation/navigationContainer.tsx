import { useNavigate } from "react-router-dom";

export default function navigationContainer() {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/register")}>Register</li>
      </ul>
    </div>
  );
}
