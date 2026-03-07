import { createUseStyles } from "react-jss";
import ChatFirstContainer from "./childComponent/ChatFirstContainer";
import SideBarContainer from "./childComponent/SideBarContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toast } from "react-toastify";

export const cssStyle = createUseStyles({
  chatPageMainContainer: {
    width: "100%",
    height: "calc(100dvh - 50px)",
    backgroundColor: "aquamarine",
    "@media (max-width: 650px)": {},
  },
  chatPageContainer: {
    display: "flex",
    gap: "20px",
  },
});
export default function ChatPage() {
  const classes = cssStyle();
  const dispatch = useDispatch();
  /*  */

  const [chatInput, setChatInput] = useState<string>("");
  const chatId = localStorage.getItem("chatId") || null;
  const { users, singleUser } = useSelector(
    (state: RootState) => state.mainUserInfoData,
  );
  const storagedUser = localStorage.getItem("user");
  const user = storagedUser ? JSON.parse(storagedUser) : {};
  const userStoragedId = user?.id;
  const getId = users.find((u) => u.id === userStoragedId);
  const userId = getId?.id;
  const usered = singleUser?.user;

  if (!usered) {
    console.log("User not loaded");
    return;
  }

  const findChat = usered.items?.find(
    (it) => Number(it.chatId) === Number(chatId),
  );
  const chatItems = findChat?.chatItems;

  /*  console.log("user", user);
  console.log(" findChat", findChat); */
  console.log("chatId", chatId);
  console.log("chatItems ", chatItems);

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
    if (!chatInput) {
      toast.error("Please Write Something");
      return;
    }

    dispatch({
      type: "FETCH_ADD_NEW_ITEM_CHAT",
      payload: {
        userId: userId,
        chatId: chatId ? Number(chatId) : 0, 
        data: {
          question: chatInput,
        },
      },
    });

    setChatInput("");
  };
  /*  */
  return (
    <div className={classes.chatPageMainContainer}>
      <div className={classes.chatPageContainer}>
        <SideBarContainer userId={userId} />
        <ChatFirstContainer
          handleAddItemChat={handleAddItemChat}
          handleAddChat={handleAddChat}
          chatItems={chatItems || []}
          chatInput={chatInput}
          setChatInput={setChatInput}
        />
      </div>
    </div>
  );
}
