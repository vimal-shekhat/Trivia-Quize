import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Form from './Form';
/*
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
*/

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function GanrateApiForm() {

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Trivia API
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "column", gap: "3rem" }}>
                    <Typography variant="subtitle1">
                        The Open Trivia Database provides a completely free JSON API for use in programming projects. Use of this API does not require a API Key, just generate the URL below use it in your own application to retrieve trivia questions.
                    </Typography>
                    <Typography variant="subtitle1">

                        All data provided by the API is available under the Creative Commons Attribution-ShareAlike 4.0 International License.
                    </Typography>
                    <Form />
                </Box>


            </Paper >
            <Copyright />
        </Container >
    );
}