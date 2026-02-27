import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import HomePageFirstContainer from "./childComponent/HomePageFirstContainer";
import { useEffect } from "react";

export default function HomePage() {
  const { users } = useSelector((state: RootState) => state.mainUserInfoData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, []);
  console.log("users", users);
  return (
    <div>
      <HomePageFirstContainer />
    </div>
  );
}
