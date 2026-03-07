import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ChatType,
  ItemsChatType,
  UserType,
} from "../../utilities/interfaces";
import { userStorage } from "../../utilities/Arrays";
const userStoraged = userStorage ? JSON.parse(userStorage as string) : null;

interface initialStateType {
  users: UserType[];
  items: ChatType[];
  singleUser: {
    user: UserType | null;
  };
  chatId: string | null;
}
const chatIdStorage = localStorage.getItem("chatId");
const initialState: initialStateType = {
  users: [],
  singleUser: {
    user: userStoraged,
  },
  items: [],
  chatId: chatIdStorage ? chatIdStorage : null,
};
const MainUserSlice = createSlice({
  name: "MainUserSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    setAddUser: (state, action: PayloadAction<UserType>) => {
      state.users.push(action.payload);
    },
    setLogInUser: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>,
    ) => {
      state.singleUser.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token);
    },
    setLogoutUser: (state) => {
      state.singleUser.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // if you stored token separately
      sessionStorage.removeItem("token");
    },
    setDeleteUser: (state, action: PayloadAction<number>) => {
      const filteredUser = state.users.filter(
        (u) => Number(u.id) !== Number(action.payload),
      );
      state.users = filteredUser;
      if (state.singleUser?.user?.id === action.payload) {
        state.singleUser.user = null;
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
      }
    },
    setUpdateUser: (
      state,
      action: PayloadAction<{ userId: number; data: UserType }>,
    ) => {
      const copyUser = [...state.users];
      const findUserIndex = copyUser.findIndex(
        (u) => Number(u.id) === Number(action.payload.userId),
      );
      if (findUserIndex == -1) return;
      copyUser[findUserIndex] = action.payload.data;
      state.users = copyUser;
      state.singleUser.user = copyUser[findUserIndex];
    },
    /* add items in user */
    setAddChatToUser: (state, action: PayloadAction<ChatType>) => {
      state.items.push(action.payload);
      // 2️⃣ update logged-in user chats
      if (state.singleUser.user) {
        if (!state.singleUser.user.items) {
          state.singleUser.user.items = [];
        }

        state.singleUser.user.items.push(action.payload);

        // 3️⃣ sync localStorage
        localStorage.setItem("user", JSON.stringify(state.singleUser.user));
      }
      const getId = action.payload.chatId;
      localStorage.setItem("chatId", String(getId));
    },
    setGetAllChatUser: (state, action: PayloadAction<ChatType[]>) => {
      state.items = action.payload;
    },

    setAddNewItemChat: (
      state,
      action: PayloadAction<{
        userId: number;
        chatId: number;
        data: ItemsChatType;
      }>,
    ) => {
      const { chatId, data } = action.payload;

      // find chat
      const chatIndex = state.items.findIndex((c) => c.chatId === chatId);

      // if chat does not exist -> create it
      if (chatIndex === -1) {
        state.items.push({
          chatId: chatId,
          chatItems: [data],
        });
      } else {
        state.items[chatIndex].chatItems.push(data);
      }

      if (!state.singleUser.user) return;

      // update singleUser
      const userChatIndex = state.singleUser.user.items.findIndex(
        (c) => c.chatId === chatId,
      );

      if (userChatIndex === -1) {
        state.singleUser.user.items.push({
          chatId: chatId,
          chatItems: [data],
        });
      } else {
        state.singleUser.user.items[userChatIndex].chatItems.push(data);
      }

      localStorage.setItem("user", JSON.stringify(state.singleUser.user));
    },
  },
});
export const {
  setUsers,
  setAddUser,
  setLogInUser,
  setLogoutUser,
  setDeleteUser,
  setUpdateUser,
  setAddChatToUser,
  setGetAllChatUser,
  setAddNewItemChat,
} = MainUserSlice.actions;
export default MainUserSlice.reducer;
