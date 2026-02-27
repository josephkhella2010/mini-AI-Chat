import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagaSlice/rootSaga";
import MainUserSliceReducer from "./reduxSlice/MainUserSlice";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    mainUserInfoData: MainUserSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Run Saga
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
