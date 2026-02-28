import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../utilities/interfaces";
import { tokenStorage, userStorage } from "../../utilities/Arrays";
const userStoraged = userStorage ? JSON.parse(userStorage as string) : null;
const tokenStoraged = tokenStorage ? tokenStorage : null;

interface initialStateType {
  users: UserType[];
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
  },
});
export const {
  setUsers,
  setAddUser,
  setLogInUser,
  setLogoutUser,
  setDeleteUser,
} = MainUserSlice.actions;
export default MainUserSlice.reducer;
