import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useEffect } from "react";

export default function UserDetailsInfo() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.mainUserInfoData);
  const findUser = users.find((u) => u.id === Number(userId));
  const userPassword = findUser?.password
    ? findUser.password.slice(0, 4).replace(/./g, "*")
    : "";
  console.log(userId);
  /* function */
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, [dispatch]);
  /*  */

  return (
    <div>
      <div>
        <h2> Firstname:{findUser?.firstname}</h2>
        <h2>Lastname:{findUser?.lastname}</h2>
        <h2>Username:{findUser?.username}</h2>
        <h2>Email:{findUser?.email}</h2>
        <h2>Date Of Birth:{findUser?.dateOfBirth}</h2>
        <h5>Password:{userPassword}</h5>
      </div>
    </div>
  );
}
