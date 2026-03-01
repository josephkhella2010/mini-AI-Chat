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
      state.singleUser.user=copyUser[findUserIndex] 
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
} = MainUserSlice.actions;
export default MainUserSlice.reducer;
