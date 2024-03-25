import React, { useState } from 'react';
import Layout from '../components/layout';
import { onLogin } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser, setNotSSO } from '../redux/slices/authSlice';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { GoogleLogin } from '@react-oauth/google';
//import { jwtDecode } from 'jwt-decode';

/* https://www.youtube.com/watch?v=yICiz12SdI4 */


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://jonathan-woodruff.github.io/">
        Jonathan Woodruff
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {
    const [values, setValues] = useState({
      email: '',
      password: '',
      isChecked: true
    });
    const [error, setError] = useState(false);
    //const [ssoToken, setSSOToken] = useState({ ssoToken: null });

    const dispatch = useDispatch();

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value});
    };

    const toggleChecked = () => {
      if (values.isChecked) {
        setValues({ ...values, isChecked: false});
      } else {
        setValues({ ...values, isChecked: true});
      }    
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await onLogin(values); //the server sends back a token/cookie
        dispatch(setNotSSO());
        dispatch(authenticateUser());
        localStorage.setItem('isAuth', 'true');
      } catch(error) {
        console.log(error.response.data.errors[0].msg); //error from axios
        setError(error.response.data.errors[0].msg);
      }
    };

    const google = () => {
      window.open('http://localhost:8000/auth/google', '_self')
    };

    /*
    const handleSSO = async () => {
      try {
        await onSSO(ssoToken);
        dispatch(authenticateUser());
        localStorage.setItem('isAuth', 'true');
      } catch(error) {
        console.log(error.response.data.errors[0].msg); //error from axios
        setError(error.response.data.errors[0].msg);
      }
    };
    */

    return (
      <Layout>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              {/*<GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />*/}
              <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={ google }
                >
                  Google
                </Button>
              <Box component="form" onSubmit={ (e) => handleSubmit(e) } noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={ values.email }
                  onChange={ (e) => handleChange(e) }
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={ values.password }
                  onChange={ (e) => handleChange(e) }
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox checked={ values.isChecked } color="primary" onChange={ () => toggleChecked() } />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/request-reset" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Layout>
    )
  };
  
  export default Login;