import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import EggIcon from '@mui/icons-material/Egg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogout } from '../api/auth';
import { unauthenticateUser, setNotSSO } from '../redux/slices/authSlice';


export const Navbar = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await onLogout();
            dispatch(setNotSSO());
            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth');
        } catch(error) {
            console.log(error.response);
        }
    };

    const { isAuth, ssoLogin } = useSelector(state => state.auth);
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='home icon'>
                    <EggIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Got Groceries
                </Typography>
                {isAuth || ssoLogin ? (
                    <Stack direction='row' spacing={3}>
                        <Button color='inherit'>Dashboard</Button>
                        <Button color='inherit' onClick={ () => logout() }>Log out</Button>
                    </Stack>
                ) : (
                    <Stack direction='row' spacing={3}>
                        <Button color='inherit' component={Link} to={`http://localhost:3000/login`}>Log in</Button>
                        <Button color='inherit' component={Link} to={`http://localhost:3000/register`}>Sign Up Free</Button>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
};