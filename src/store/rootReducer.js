import { combineReducers } from "redux";
import auth from "./auth/userSlice";
import theme from "./themeSettings/themeSlice";

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    theme,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
