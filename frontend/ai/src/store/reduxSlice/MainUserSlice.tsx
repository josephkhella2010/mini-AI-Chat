import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../../utilities/interfaces";

interface initialStateType {
  users: UserType[];
}
const initialState: initialStateType = {
  users: [],
};
const MainUserSlice = createSlice({
  name: "MainUserSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    setAddUser(state, action: PayloadAction<UserType>) {
      state.users.push(action.payload);
    },
  },
});
export const { setUsers, setAddUser } = MainUserSlice.actions;
export default MainUserSlice.reducer;
