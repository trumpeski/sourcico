import React, { useState, useEffect, useReducer } from "react";
import { TextField, Grid, Button, FormControl } from "@material-ui/core";
import Ingredients from "../components/Ingredients/Ingredients";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../redux/actions/action";

function CreateRecipe() {
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const listOfRecipies = useSelector((state) => state.recipe.listOfRecipies);

  const [time, setTime] = useState("");
  const [instructions, setInstructions] = useState("");

  //wtf
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    setIngredients([{ quantity: 0, ingredientName: "" }]);
  }, []);

  //za ova ne rab
  const addIngredient = () => {
    console.log("ingredients");
    console.log(ingredients);
    let ingredient = { quantity: 0, ingredientName: "" };
    let updatedIngredientsList = ingredients;
    updatedIngredientsList.push(ingredient);
    forceUpdate();
    setIngredients(updatedIngredientsList);
  };
  const removeIngredient = (index) => {
    let updatedIngredientsList = ingredients;

    updatedIngredientsList.splice(index, 1);
    forceUpdate();
    setIngredients(updatedIngredientsList);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeSource = (e) => {
    setSource(e.target.value);
  };

  const onChangeTime = (e) => {
    setTime(e.target.value);
  };

  const onChangeInstructions = (e) => {
    setInstructions(e.target.value);
    console.log(instructions);
  };
  const onChanceQuantity = (e, index) => {
    let updatedIngredients = ingredients;

    updatedIngredients[index].quantity = Number(e.target.value);
    setIngredients(updatedIngredients);
  };
  const onChanceIngredientName = (e, index) => {
    let updatedIngredients = ingredients;
    updatedIngredients[index].ingredientName = e.target.value;
    forceUpdate();

    setIngredients(updatedIngredients);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (ingredients < 1) {
      alert("please enter at least 1 ingrtedient");
    } else {
      let id = listOfRecipies.length + 1;
      let recipe = {
        ID: id,
        name: name,
        source: source,
        time: time,
        instructions: instructions,
        ingredients: ingredients,
      };
      dispatch(createRecipe(recipe));
      alert("Created");
    }
  };

  return (
    <div style={{ marginLeft: "20%", marginRight: "20%", marginTop: "50px" }}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              id="recipeName"
              label="Recipe name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={onChangeName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="recipeSource"
              label="Recipe source"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={onChangeSource}
            />
          </Grid>
          {ingredients.map((el, index) => {
            return (
              <Grid item xs={12}>
                <Ingredients
                  quantity={el.quantity}
                  ingredientName={el.ingredientName}
                  index={index}
                  onChanceIngredientName={onChanceIngredientName}
                  onChanceQuantity={onChanceQuantity}
                  removeIngredient={removeIngredient}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button
              onClick={addIngredient}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add new Ingredient
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="Preparation time"
              type="time"
              label="Preparation time"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={onChangeTime}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              multiline
              id="Preparation instructions"
              label="Preparation instructions"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange={onChangeInstructions}
            />
          </Grid>
        </Grid>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

export default CreateRecipe;
