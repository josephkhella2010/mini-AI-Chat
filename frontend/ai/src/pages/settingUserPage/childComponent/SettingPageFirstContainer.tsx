import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useEffect } from "react";
import { setLogoutUser } from "../../../store/reduxSlice/MainUserSlice";

export default function SettingPageFirstContainer() {
  const { users, singleUser } = useSelector(
    (state: RootState) => state.mainUserInfoData,
  );
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("singleUser in setting Page", singleUser);

  /* function */
  const filteredUser = users.find((user) => user.id === Number(userId));
  console.log("filteredUser", filteredUser);
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, [dispatch]);

  /*  */
  return (
    <div>
      <div>
        <ul>
          <li>Update User</li>
          <li
            onClick={() => {
              dispatch({
                type: "FETCH_DELETE_USER",
                payload: singleUser?.user?.id,
              });
              navigate("/");
            }}
          >
            {" "}
            Delete User
          </li>
          <li
            onClick={() => {
              dispatch(setLogoutUser());
              navigate("/");
            }}
          >
            {" "}
            logout
          </li>{" "}
        </ul>
      </div>
    </div>
  );
}
