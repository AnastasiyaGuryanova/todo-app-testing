import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "src/store/taskSlice";

type Props = {
  children: React.ReactNode;
  preloadedState?: object;
};

export const JestStoreProvider = ({ children, preloadedState = {} }: Props) => {
  const testStore = configureStore({
    reducer: { taskList: taskReducer },
    preloadedState,
  });

  return <Provider store={testStore}>{children}</Provider>;
};
