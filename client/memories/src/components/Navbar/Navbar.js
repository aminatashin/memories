import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import Wood from "../../assesments/memory.png";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../slice/fetchSlice";
// ===============================================
const Navbar = () => {
  // const [user, setcurrentUser] = useState("");

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.PostsSlice.user);
  // ===============================================
  // useEffect(() => {
  //   if (!localStorage.getItem("jwtToken")) {
  //     alert("email&password not found!");
  //     navigate("/auth");
  //   }
  // }, []);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  // ===============================================
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  // ===============================================
  // const getUser = async () => {
  //   const res = await fetch(`http://localhost:5000/usermemory/signup/me`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //     },
  //   });
  //   if (res.ok) {
  //     const data = await res.json();
  //     setcurrentUser(data);
  //     console.log(data);
  //   } else {
  //     console.log("getting user in navbar error");
  //   }
  // };
  // ===============================================
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h3" align="center">
          Memories
        </Typography>

        <img className={classes.image} src={Wood} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.firstName}
              src={user.imageUrl}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.firstName}
              {user.lastName}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </div>
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
