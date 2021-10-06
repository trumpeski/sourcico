import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../redux/actions/action";

import {
  TextField,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Card,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  row: {
    "&:hover": {
      backgroundColor: "#e4e9f2",
      cursor: "pointer",
    },
  },
  grid: {
    textAlign: "center",
    borderStyle: "solid",
    borde: "1px",
    borderColor: "red",
  },
});

function createData(name, time, source, instructions, ingredients) {
  return { name, time, source, instructions, ingredients };
}

function Recipies() {
  const listOfRecipies = useSelector((state) => state.recipe.listOfRecipies);
  const dispatch = useDispatch();

  const [selectedRecipe, setSelectedRecipe] = useState("");
  const classes = useStyles();
  useEffect(() => {
    console.log(listOfRecipies);
  }, [listOfRecipies]);
  const onSelectedRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };
  const onCloseSelected = () => {
    setSelectedRecipe("");
  };

  const onDeleteRecipe = (recipeID) => {
    dispatch(deleteRecipe(recipeID));
  };
  return (
    <React.Fragment>
      <Collapse in={selectedRecipe == ""}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Source</TableCell>
                <TableCell align="right">Instructions</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfRecipies
                ? listOfRecipies.map((row) => {
                    let instructions = "";
                    let counter = 0;
                    let timeSplited = row.time.split(":");
                    debugger;

                    let hours = timeSplited[0];
                    let minutes = timeSplited[1];

                    if (row.instructions.length > 50) {
                      let instructionsSplited = row.instructions.split(" ");
                      instructionsSplited.forEach((element) => {
                        let lastCounter = counter;
                        counter = counter + element.length;
                        if (lastCounter < 50) {
                          if (counter < 50) {
                            instructions = instructions + element + " ";
                          } else {
                            instructions = instructions + "...";
                          }
                        }
                      });
                    } else {
                      instructions = row.instructions;
                    }

                    return (
                      <TableRow
                        className={classes.row}
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          onClick={() => onSelectedRecipe(row)}
                          component="th"
                          scope="row"
                        >
                          {row.ID}
                        </TableCell>
                        <TableCell
                          onClick={() => onSelectedRecipe(row)}
                          align="right"
                        >
                          {" "}
                          {row.name}
                        </TableCell>

                        <TableCell
                          onClick={() => onSelectedRecipe(row)}
                          align="right"
                        >
                          {row.source}
                        </TableCell>
                        <TableCell
                          onClick={() => onSelectedRecipe(row)}
                          align="right"
                        >
                          {instructions}
                        </TableCell>
                        <TableCell
                          onClick={() => onSelectedRecipe(row)}
                          align="right"
                        >
                          {row.ingredients.map((ingredient, index) => {
                            if (index < 3)
                              return `${ingredient.ingredientName}: ${ingredient.quantity}, `;
                            if (index == 3)
                              return `${ingredient.ingredientName}: ${ingredient.quantity} `;
                            if (index == 4) {
                              return `...`;
                            }
                          })}
                        </TableCell>
                        <TableCell
                          onClick={() => onSelectedRecipe(row)}
                          align="right"
                        >
                          {hours != "00" ? hours + ":" : null}
                          {minutes}
                          {hours == "00" ? " min" : null}
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => onDeleteRecipe(row.ID)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
      <Collapse in={selectedRecipe != ""}>
        <Card
          style={{
            marginLeft: "15%",
            marginRight: "15%",
            backgroundColor: "#e4e9f2",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                onClick={onCloseSelected}
              >
                Back
              </Button>
            </Grid>
            <Grid className={classes.grid} item xs={12}>
              <h1>{selectedRecipe.name}</h1>
            </Grid>
            <Grid className={classes.grid} item xs={6}>
              <p> {selectedRecipe.source} </p>
            </Grid>
            <Grid className={classes.grid} item xs={6}>
              {selectedRecipe.time}
            </Grid>

            {selectedRecipe != "" && selectedRecipe.ingredients.length > 0
              ? selectedRecipe.ingredients.map((ingredient) => {
                  return (
                    <React.Fragment>
                      <Grid className={classes.grid} item xs={6}>
                        {ingredient.quantity}
                      </Grid>
                      <Grid className={classes.grid} item xs={6}>
                        {ingredient.ingredientName}
                      </Grid>
                    </React.Fragment>
                  );
                })
              : null}
            <Grid className={classes.grid} item xs={12}>
              {selectedRecipe.instructions}
            </Grid>
          </Grid>
        </Card>
      </Collapse>
    </React.Fragment>
  );
}

export default Recipies;
