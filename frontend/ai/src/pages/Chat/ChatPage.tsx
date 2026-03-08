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
  const items = useSelector(
    (state: RootState) => state.mainUserInfoData.singleUser.user?.items || [],
  );
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

  const findChat = usered.items?.filter(
    (_, ind) => ind === usered.items.length - 1,
  );
  const chatItems = findChat?.[0]?.chatItems;

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
    const lastChat = items[items.length - 1];

    if (lastChat && lastChat.chatItems.length === 0) {
      toast.error("please write something in to search");
      return;
    }
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
  const handleDelete = (chatIdItem: number) => {
      if (!chatIdItem) return;
    dispatch({
      type: "FETCH_DELETE_CHAT_USER",
      payload: {
        userId: userId,
        chatId: chatIdItem,
      },
    });
  };
  /*  */
  return (
    <div className={classes.chatPageMainContainer}>
      <div className={classes.chatPageContainer}>
        <SideBarContainer 
        
        userId={userId} handleDelete={handleDelete} 
         items={ items}
        />
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
