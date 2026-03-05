import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";

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
    top: "95%",
    overflowY: "auto",
    "& textarea": {
      width: "80%",
      minHeight: "50px",
    },
  },
});

export default function ChatFirstContainer() {
  const classes = cssStyle();
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState<string>("");
  const chatId = localStorage.getItem("chatId") || null;
  const { users, singleUser, items } = useSelector(
    (state: RootState) => state.mainUserInfoData,
  );
  const storagedUser = localStorage.getItem("user");
  const user = storagedUser ? JSON.parse(storagedUser) : {};
  const userStoragedId = user?.id;
  const getId = users.find((u) => u.id === userStoragedId);
  const userId = getId?.id;
  console.log("singleUser ", singleUser);
  console.log("chatInput", chatInput);
  console.log("items", items);
  console.log("chatId", chatId);
  /* function */
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch({
        type: "FETCH_ALL_CHATS_USER",
        payload: { userId },
      });
    }
  }, [dispatch, userId]);
  console.log(userId);

  const handleAddChat = () => {
    dispatch({
      type: "FETCH_ADD_NEW_CHAT",
      payload: {
        userId: Number(userId),
      },
    });
  };
  const handleAddItemChat = () => {
    dispatch({
      type: "FETCH_ADD_NEW_ITEM_CHAT",
      payload: {
        userId: userId,
        chatId: Number(chatId),
        data: chatInput,
      },
    });
  };

  /*  */
  return (
    <div className={classes.chatFirstMainContainer}>
      <div className={classes.chatFirstContent}>
        <button onClick={() => handleAddChat()}>New Chat</button>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
      </div>
      <div className={classes.chatInputSection}>
        <div>
          <textarea
            placeholder="Hello and Welcom"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button onClick={handleAddItemChat}> send</button>
        </div>
      </div>
    </div>
  );
}
