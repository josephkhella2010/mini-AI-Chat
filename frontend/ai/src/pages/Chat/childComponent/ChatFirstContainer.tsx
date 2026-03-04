import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect } from "react";

export const cssStyle = createUseStyles({
  chatFirstMainContainer: {
    width: "70%",
    backgroundColor: "yellow",
    height: "calc(100dvh - 100px)",
    display: "flex",
    gap: "40px",
    flexDirection: "column",
    position: "relative",

    "@media (max-width: 650px)": {},
  },
  chatFirstContent: {
    backgroundColor: "blue",
    paddingBottom: "200px",
    overflowY: "auto",
  },
  chatInputSection: {
    backgroundColor: "orangered",
    width: "100%",
    height: "50px",
    position: "absolute",
    top: "100%",
  },
});

export default function ChatFirstContainer() {
  const classes = cssStyle();
  const dispatch = useDispatch();
  const { users, singleUser } = useSelector(
    (state: RootState) => state.mainUserInfoData,
  );
  const storagedUser = localStorage.getItem("user");
  const user = storagedUser ? JSON.parse(storagedUser) : {};
  const userStoragedId = user?.id;
  const getId = users.find((u) => u.id === userStoragedId);
  const userId = getId?.id;
  console.log(userId);
  console.log("singleUser ", singleUser);

  /* function */
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, []);
  return (
    <div className={classes.chatFirstMainContainer}>
      <div className={classes.chatFirstContent}>
        <button
          onClick={() =>
            dispatch({
              type: "FETCH_ADD_NEW_CHAT",
              payload: {
                userId: Number(userId),
              },
            })
          }
        >
          New Chat
        </button>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
      </div>
      <div className={classes.chatInputSection}>
        <div>input</div>
      </div>
    </div>
  );
}
