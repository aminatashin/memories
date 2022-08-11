import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,
  Paper,
} from "@material-ui/core";
// import memory from "../../assesments/memoriesLogo.png";
import memoriesText from "../../assesments/memoriesText.png";
import camera2 from "../../assesments/camera2.png";
import sign2 from "../../assesments/sign2.png";
import title2 from "../../assesments/title2.jpg";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../slice/fetchSlice";

// ===============================================
const Navbar = ({ user, setcurrentUser }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  // const user = useSelector((state) => state.PostsSlice.user);
  // ===============================================
  // useEffect(() => {
  //   if (!localStorage.getItem("jwtToken")) {
  //     alert("email&password not found!");
  //     navigate("/auth");
  //   }
  // }, []);
  useEffect(() => {
    console.log("are we here");
    if (localStorage.getItem("jwtToken")) {
      getUser();
    } else {
      setcurrentUser("");
    }
  }, [location.pathname]);
  // ===============================================
  const handleLogOut = () => {
    localStorage.clear();
    setcurrentUser("");
    //dispatch(getPosts());
    navigate("/auth");
  };
  // ===============================================
  const getUser = async () => {
    const res = await fetch(`http://localhost:5000/usermemory/signup/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setcurrentUser(data);
    } else {
      console.log("getting user in navbar error");
    }
  };
  // ===============================================

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to={"/"}>
          {" "}
          <img component={Link} to="/" src={title2} alt="pic" height="75px" />
        </Link>

        <img className={classes.image} src={sign2} alt="pic" height="110px" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.firstName}
              src={user.selectedFile}
            >
              {user.firstName}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.firstName}-{user.lastName}
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
