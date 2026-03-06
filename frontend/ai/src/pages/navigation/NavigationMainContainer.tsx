import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  navigationMainContainer: {
    height: "50px",
    width: "100%",

    backgroundColor: "olivedrab",
  },
  navigationContainer: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
export default function NavigationMainContainer() {
  const classes = cssStyle();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
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
    if (token) {
      CalculateDateOfBirth();
    }
  }, [singleUser]);

  console.log("singleUser", singleUser);
  return (
    <div className={classes.navigationMainContainer}>
      <ul className={classes.navigationContainer}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/register")}>Register</li>
        <li onClick={() => navigate("/login")}>Login</li>

        {token && (
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
