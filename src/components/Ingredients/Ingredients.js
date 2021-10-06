import React, { useRef, useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";

function Ingredients({
  quantity,
  ingredientName,
  index,
  onChanceQuantity,
  onChanceIngredientName,
  removeIngredient,
}) {
  const [ingredientsList, setIngredientsList] = useState([
    "",
    "Flour",
    "Milk",
    "Oil",
    "Salt",
    "Sugar",
    "Eggs",
    "Tomatoes",
    "Peppers",
    "Cheese",
    "Potatoes",
    "Meat",
  ]);

  const ingredientRef = useRef("");
  const quantityRef = useRef("");
  useEffect(() => {
    debugger;
    ingredientRef.current.value = ingredientName;
    quantityRef.current.value = quantity;
  }, [quantity, ingredientName]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={(e) => removeIngredient(index)}
          >
            Remove
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id={"quantity" + index}
            label="quantity"
            type="Number"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChanceQuantity(e, index)}
            inputRef={quantityRef}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            id={"Ingredient" + index}
            id="Ingredient"
            label="Ingredient"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChanceIngredientName(e, index)}
            inputRef={ingredientRef}
          /> */}
          <FormControl required variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Ingredient
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              id={"IngredientSelect" + index}
              value={ingredientName}
              label="Ingredient"
              inputRef={ingredientRef}
              onChange={(e) => onChanceIngredientName(e, index)}
            >
              {ingredientsList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default Ingredients;
