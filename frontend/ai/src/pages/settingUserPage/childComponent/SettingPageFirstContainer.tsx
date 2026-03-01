import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutUser } from "../../../store/reduxSlice/MainUserSlice";
import type { singleUserType } from "../../../utilities/interfaces";

interface PropsType {
  singleUser: singleUserType;
  handleEdit: (userId: number) => void;
}

export default function SettingPageFirstContainer({
  singleUser,
  handleEdit,
}: PropsType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = singleUser?.user?.id;

  console.log("singleUser in setting Page", singleUser);

  /*  */
  return (
    <div>
      <div>
        <ul>
          <li
            onClick={() => {
              if (!userId) return;
              handleEdit(userId);
            }}
          >
            Update User
          </li>
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
