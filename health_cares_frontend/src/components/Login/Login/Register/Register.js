import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
import useAuth from "../../../../Hooks/useAuth";
import UserProfile from "../UserProfile/UserProfile";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import apiConfig from "../../../../apiConfig";  // Import the API configuration

const Register = () => {
  const {
    user,
    singInUsingGoogle,
    singInUsingFacebook,
    singInUsingGithub,
    handleConfirmPass,
    handleUserName,
    handleEmail,
    handlePass,
    error,
    setError,
    toggleLogin,
    setIsLoading,
    setUser, // Ensure setUser is imported from useAuth
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${apiConfig.baseURL}/register`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        history.push("/profile");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {user?.email ? (
        <>
          <UserProfile />
        </>
      ) : (
        <>
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 3 }}
              style={{ justifyContent: "center" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onBlur={(e) => setUsername(e.target.value)}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onBlur={(e) => setConfirmPassword(e.target.value)}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ p: 1 }} color="red">
                    {error}
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid
                container
                justifyContent="flex-end"
                style={{ justifyContent: "center" }}
              >
                <Grid item>
                  <Button onClick={toggleLogin(false)}>
                    <Link
                      className="body-link-text-style"
                      to="/login"
                      variant="body2"
                    >
                      Already have an account? Login
                    </Link>
                  </Button>
                </Grid>
              </Grid>
              <Typography>
                <Typography style={{ justifyContent: "center" }}>
                  <Grid
                    container
                    sx={{ mt: 2, mb: 3 }}
                    justifyContent="flex-end"
                    style={{ justifyContent: "center" }}
                  >
                    <Grid item>
                      <GoogleButton
                        className="google-btn"
                        type="dark" // can be light or dark
                        onClick={singInUsingGoogle}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{ mb: 3 }}
                    justifyContent="flex-end"
                    style={{ justifyContent: "center" }}
                  >
                    {/* Facebook btn */}
                    <Grid item>
                      <Button
                        onClick={singInUsingFacebook}
                        variant="contained"
                        sx={{ p: 1, bgcolor: "#4267B2" }}
                      >
                        <FacebookIcon />
                        Facebook
                      </Button>
                    </Grid>
                    <Typography textAlign="center" sx={{ p: 2 }}>
                      Or
                    </Typography>
                    {/* GitHUB btn */}
                    <Grid item>
                      <Button
                        onClick={singInUsingGithub}
                        variant="contained"
                        sx={{ p: 1, mb: 2, bgcolor: "#171515" }}
                        style={{ justifyContent: "center" }}
                      >
                        <GitHubIcon /> GitHub
                      </Button>
                    </Grid>
                  </Grid>
                </Typography>
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Register;