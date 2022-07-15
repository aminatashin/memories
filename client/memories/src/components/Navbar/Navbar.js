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
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../../slice/fetchSlice";

// ===============================================
const Navbar = () => {
  const [user, setcurrentUser] = useState("");
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
          <img
            component={Link}
            to="/"
            src={memoriesText}
            alt="icon"
            height="45px"
          />
        </Link>

        <img className={classes.image} src={camera2} alt="icon" height="40px" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.firstName}
              src={user.imageUrl}
            >
              {/* {user.firstName.charAt(0)} */}
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
