import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
import { Container, CssBaseline, Box, Typography, IconButton } from '@mui/material';

export const Header = () => {
    return (
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
                <EggOutlinedIcon />
                <Typography component="h1" variant="h5">
                    Got Groceries
                </Typography>
            </Box>
        </Container>
    );
};