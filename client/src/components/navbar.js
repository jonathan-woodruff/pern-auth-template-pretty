import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import EggIcon from '@mui/icons-material/Egg';
import { useSelector } from 'react-redux';


export const Navbar = () => {
    const { isAuth } = useSelector(state => state.auth);
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='home icon'>
                    <EggIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Got Groceries
                </Typography>
                {isAuth ? (
                    <Stack direction='row' spacing={3}>
                        <Button color='inherit'>Dashboard</Button>
                    </Stack>
                ) : (
                    <Stack direction='row' spacing={3}>
                        <Button color='inherit'>Log in</Button>
                        <Button color='inherit'>Sign Up Free</Button>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
};