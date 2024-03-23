import React, { useState } from 'react';
import Layout from '../components/layout';
import { onRequestReset } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
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

const RequestReset = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleChange = (e) => {
      setEmail(e.target.value);
    };

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await onRequestReset(email); //the server sends back a token/cookie
        setEmailSent(true);
        setError(false);
      } catch(error) {
        console.log(error.response.data.errors[0].msg); //error from axios
        setError(error.response.data.errors[0].msg);
      }
    };

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
                Let's reset your password
              </Typography>
              <Box component="form" onSubmit={ (e) => handleSubmit(e) } noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={ email }
                  onChange={ (e) => handleChange(e) }
                  autoComplete="email"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset
                </Button>
                { emailSent && 
                    <Typography component="h3" variant="h6" sx={{ color: 'green' }}>
                        Success! Check your email for a link to reset your password.
                    </Typography> 
                }
                { error &&
                    <Typography component="h3" variant="h6" sx={{ color: 'red' }}>
                        Email does not exist. <Link href='/register'>Try signing up with a new account.</Link>
                    </Typography>
                }
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Layout>
    )
  };
  
  export default RequestReset;