import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface InitialStateType {
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  loading: false,
  error: null,
};
const LoadingAndErrorSlice = createSlice({
  name: "LoadingAndErrorSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setClearLoading: (state) => {
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setLoading, setClearLoading, setError } =
  LoadingAndErrorSlice.actions;
export default LoadingAndErrorSlice.reducer;
