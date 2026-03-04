import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatType, UserType } from "../../utilities/interfaces";
import { tokenStorage, userStorage } from "../../utilities/Arrays";
const userStoraged = userStorage ? JSON.parse(userStorage as string) : null;
const tokenStoraged = tokenStorage ? tokenStorage : null;

interface initialStateType {
  users: UserType[];
  items: ChatType[];
  singleUser: {
    user: UserType | null;
    token: string | null;
  };
}
const initialState: initialStateType = {
  users: [],
  singleUser: {
    user: userStoraged,
    token: tokenStoraged,
  },
  items: [],
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
      state.singleUser.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token);
    },
    setLogoutUser: (state) => {
      state.singleUser.user = null;
      state.singleUser.token = null;
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
    setDeleteUser: (state, action: PayloadAction<number>) => {
      const filteredUser = state.users.filter(
        (u) => Number(u.id) !== Number(action.payload),
      );
      state.users = filteredUser;
      if (state.singleUser?.user?.id === action.payload) {
        state.singleUser.user = null;
        state.singleUser.token = null;
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
    },
    setGetAllChatUser: (state, action: PayloadAction<ChatType[]>) => {
      state.items = action.payload;
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
} = MainUserSlice.actions;
export default MainUserSlice.reducer;
