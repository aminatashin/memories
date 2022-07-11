import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import Wood from "../../assesments/memory.png";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const Navbar = ({ currentId, setCurrentId }) => {
  const [user, setuser] = useState("");
  const classes = useStyles();
  useEffect(() => {
    const token = user.jwtToken;
    if (token) {
      getUser();
    }
  }, []);
  const getUser = async () => {
    const res = await fetch(
      `http://localhost:5000/usermemory/signup` + currentId
    );
    if (res.ok) {
      const data = res.json();
      console.log(data);
      setuser(data);
    }
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h3" align="center">
          <Link to={"/"}> Memories</Link>
        </Typography>

        <img className={classes.image} src={Wood} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          user.map((user) => (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.firstName}
                src={user.imageurl}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography className={classes.username} veriant="h6">
                {user.firstName}
              </Typography>
              <Button
                veriant="contained"
                className={classes.logout}
                color="secondary"
                onClick={""}
              >
                LOG OUT
              </Button>
            </div>
          ))
        ) : (
          <Link to="/auth">
            <Button veriant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
