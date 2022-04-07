import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./Icon";
import useStyles from "./styles";

// import { GoogleLogin } from "react-google-login";
// import { useDispatch } from "react-redux";
// import { signin, signup } from "../../redux/actions/auth.actions.js";
// import actionTypes from "../../redux/constants/actionTypes.js";
import Input from "./Input";

const initialState = [
  {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
];
//! !== Saved Users !==
//! !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !==
const saveUser = [
  {
    firstName: "Ayan",
    lastName: "Ansari",
    email: "test@gmail.com",
    password: "a",
    confirmPassword: "admin12",
  },
  {
    firstName: "Abhishek",
    lastName: "",
    email: "abhi@gmail.com",
    password: "admin",
    confirmPassword: "admin",
  },
  {
    firstName: "test",
    lastName: "test",
    email: "test12@gmail.com",
    password: "test",
    confirmPassword: "test",
  },
];
//! !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !== !==

const Auth = ({ logedIn, setLogedIn }) => {
  const [form, setForm] = useState(initialState);
  const [invalidCredentials, setInvalidCredentials] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
    } else {
      // const { email, password } = saveUser;
      saveUser.map((u) => {
        if (u.password === form.password && u.email === form.email) {
          setInvalidCredentials("");
          setLogedIn(true);
          navigate("/");
        } else {
          setInvalidCredentials("Invalid Credentials!⚠️");
        }
      });
    }
  };

  // !========= ===USING REDUX=== =======
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (isSignup) {
  //     dispatch(signup(form, navigate));
  //   } else {
  //     dispatch(signin(form, navigate));
  //   }
  // };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: actionTypes.AUTH, data: { result, token } });

  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // !========= ===USING REDUX=== =======

  // const googleError = () =>
  //   alert("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
                <div className="w-full text-center bg-red-300">
                  <h1>This Feature is currently under development</h1>
                </div>
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
              type={showPassword ? "text" : "password"}
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
          <div className="mt-[10px]">
            {invalidCredentials && invalidCredentials}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            clientId="373744547754-gv9udk62jr7rs8b9afiuashgrcq7ieng.apps.googleusercontent.com"
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
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
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
