import { combineReducers } from "redux";
import RecipeReducer from "./reducers/RecipeReducer";

const rootReducer = combineReducers({
  recipe: RecipeReducer,
});

export default rootReducer;
