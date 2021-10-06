import { DELETE_RECIPE, ADD_RECIPE } from "./actionConstant";
export const createRecipe = (recipe) => {
  debugger;
  return {
    type: ADD_RECIPE,
    payload: recipe,
  };
};
export const deleteRecipe = (ID) => {
  debugger;
  return {
    type: DELETE_RECIPE,
    payload: ID,
  };
};
