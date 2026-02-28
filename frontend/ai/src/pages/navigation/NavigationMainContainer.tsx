import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function NavigationMainContainer() {
  const navigate = useNavigate();
  const { singleUser } = useSelector(
    (state: RootState) => state.mainUserInfoData,
  );
  const userName =
    singleUser?.user?.firstname.slice(0, 1).toUpperCase() +
    " " +
    singleUser?.user?.lastname.slice(0, 1).toUpperCase();
  const userDateOfBirth = singleUser?.user?.dateOfBirth;
  const userId = singleUser?.user?.id;
  /* fucntion  */
  function CalculateDateOfBirth() {
    if (!userDateOfBirth) return;
    const today = new Date();
    const birthDate = new Date(userDateOfBirth);
    const userAge = today.getFullYear() - birthDate.getFullYear();
    if (
      birthDate.getMonth() == today.getMonth() &&
      birthDate.getDate() == today.getDate()
    ) {
      toast.success(
        `🎉 Congratulations! You are ${userAge} years old today. Happy Birthday!`,
      );
    }
  }
  useEffect(() => {
    if (singleUser?.token) {
      CalculateDateOfBirth();
    }
  }, [singleUser]);

  console.log("singleUser", singleUser);
  return (
    <div>
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/register")}>Register</li>
        <li onClick={() => navigate("/login")}>Login</li>

        {singleUser.token && (
          <div
            style={{
              borderRadius: "50%",
              backgroundColor: "red",
              width: "70px",
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/user-setting/${userId}`)}
          >
            <h2>{userName}</h2>
          </div>
        )}
      </ul>
    </div>
  );
}
