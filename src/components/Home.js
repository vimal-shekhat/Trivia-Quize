import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
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



export default function Home() {
    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/ganrate");
    };
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Quiz Instructions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "column" }}>
                    <Typography variant="subtitle1">
                        1. Create a form which allows users to select the following
                    </Typography>

                    <ol><li>a. Quiz category</li><li>b. Quiz difficulty</li><li>c. Number of questions will always be defaulted to 10</li><li>d. Quiz type will always be defaulted to multiple choice</li></ol>
                    <Typography variant="subtitle1">
                        2. Create a page where users can take the quiz that was queried by the above form
                    </Typography>
                    <ol><li>a. Each question should appear on the quiz</li><li>b. Below each display the answers in random order</li><li>c. When a user selects an answer, If it’s true it should turn green, if false it should turn red</li><li>and the right answer should turn green</li><li>d. When they finish the test, they should be shown their score and then taken back to the</li><li>form above in section 2.</li></ol>

                    <Typography variant="subtitle1">

                        3. Keep track of the following metrics in a separate global part of the application
                    </Typography>

                    <li>a. Their current test score (e.g. 4/10)</li>
                    <ul><li>i. First value should be number of correct answers</li><li>ii. Second value should be number of questions currently answered</li></ul>
                    <li>b. Their overall test score</li>
                    <ul><li>i. First value should be number of overall correct answers</li><li>ii. Second value should be number of overall questions answered</li></ul>

                </Box>

                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                >
                    Next
                </Button>
            </Paper >
            <Copyright />
        </Container >
    );
}