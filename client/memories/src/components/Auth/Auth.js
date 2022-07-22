import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Avatar,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
// ===============================================
const Auth = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    likeCount: null,
  });

  const classes = useStyles();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("jwtToken")) {
  //   } else {
  //     alert("email&password not found!");
  //   }
  // }, []);

  // const googleSuccess = (res) => {
  //   console.log(res);
  // };
  // const googleError = () =>
  //   alert("Google Sign In was unsuccessful. Try again later");
  const handleShowPassword = () => {
    setShowpassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMood = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowpassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signupUser();
    } else {
      signinUser();
    }
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // ============================================
  const signupUser = async () => {
    const res = await fetch(`http://localhost:5000/usermemory/signup`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("successfully Signed Up!");
      switchMood();
    }
  };
  // ============================================
  const signinUser = async () => {
    const res = await fetch(`http://localhost:5000/usermemory/signin`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("jwtToken", data.token);
      console.log(data.token);
      alert("Enjoy Your Memory!");
      navigate("/");
    } else {
      console.log("something went Wrong");
    }
  };
  // ============================================

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showpassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId=""
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            // onSuccess={googleSuccess}
            // onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMood}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
