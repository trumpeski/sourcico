import { DELETE_RECIPE, ADD_RECIPE } from "../actions/actionConstant";

const initialState = {
  listOfRecipies: [
    {
      ID: 1,
      name: "Torta",
      source: "tota.com",
      ingredients: [{ quantity: 10, ingredientName: "Jajca" }],
      time: "30:15",
      instructions: "Napraj torta",
    },
    {
      ID: 2,
      name: "Torta",
      source: "tota.com",
      ingredients: [
        { quantity: 10, ingredientName: "Jajca" },
        { quantity: 1.5, ingredientName: "brasno" },
        { quantity: 10, ingredientName: "Jajca" },
        { quantity: 1.5, ingredientName: "brasno" },
        { quantity: 10, ingredientName: "Jajca" },
        { quantity: 1.5, ingredientName: "brasno" },
      ],
      time: "00:15",
      instructions:
        "Napraj torta instructions instructions instructions v instructions Napraj torta instructions instructions instructions v instructions Napraj torta instructions instructions instructions v instructions Napraj torta instructions instructions instructions v instructions Napraj torta instructions instructions instructions v instructions Napraj torta instructions instructions instructions v instructionsvNapraj torta instructions instructions instructions v instructions",
    },
  ],
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        listOfRecipies: [...state.listOfRecipies, action.payload],
      };
    case DELETE_RECIPE:
      return {
        ...state,
        listOfRecipies: state.listOfRecipies.filter(
          (item) => item.ID !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default RecipeReducer;
