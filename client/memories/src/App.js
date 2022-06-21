import React from "react";
import { Container, AppBar, Grow, Typography, Grid } from "@material-ui/core";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import Wood from "../src/assesments/memory.jpg";
import useStyles from "./styles";
function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={Wood} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid>
            <Form item xs={12} sm={4} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
}

export default App;