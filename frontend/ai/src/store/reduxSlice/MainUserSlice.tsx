import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../utilities/interfaces";
import { tokenStorage, userStorage } from "../../utilities/Arrays";
const userStoraged = userStorage ? JSON.parse(userStorage as string) : null;
const tokenStoraged = tokenStorage ? tokenStorage : null;

interface initialStateType {
  users: UserType[];
  user: {
    singleUser: UserType | null;
    token: string | null;
  };
}
const initialState: initialStateType = {
  users: [],
  user: {
    singleUser: userStoraged,
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
      state.user.singleUser = action.payload.user;
      state.user.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token);
    },
  },
});
export const { setUsers, setAddUser, setLogInUser } = MainUserSlice.actions;
export default MainUserSlice.reducer;
