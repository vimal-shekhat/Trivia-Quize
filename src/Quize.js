import React, { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from '@mui/material/Typography';
import { QuizContext } from './store/Index';
import { useNavigate } from 'react-router-dom';
import Score from './components/Score';
import Summary from './components/Summary';
import { QUIZE_QUESTION } from './constants/ActionTypes';

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

// const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Quize() {
    //const [question, setQuetion] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const { quizeData, dispatch } = useContext(QuizContext)
    const { formdata, question } = quizeData
    const navigate = useNavigate();
    useEffect(() => {

        const getQuestion = async () => {
            if (!formdata) {
                navigate('/')
            }
            const url = 'https://opentdb.com/api.php?amount=' + formdata.number + '&category=' + formdata.category + '&difficulty=' + formdata.difficulty + '&type=' + formdata.type
            const data = await fetch(url);
            const { results } = await data.json();
            const parsingData = results?.map((item) => {
                const list = [...item.incorrect_answers, item.correct_answer]
                let newArray = list.sort(() => Math.random() - 0.5)
                return { ...item, incorrect_answers: newArray, answer: "", attempt: false, border: false }

            })
            dispatch({ type: QUIZE_QUESTION, payload: parsingData })
        }
        getQuestion();
    }, [formdata, dispatch, navigate])

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const steps = question?.map((item, index) => {
        return index + 1;
    }) || []
    const handleChange = (event) => {
        const { value } = event.target
        const updateQue = [...question];
        if (value !== "" && updateQue[activeStep].attempt === false) {
            updateQue[activeStep].answer = value
            updateQue[activeStep].attempt = true
            if (value !== updateQue[activeStep].correct_answer) {
                updateQue[activeStep].border = true

            }

            dispatch({ type: QUIZE_QUESTION, payload: updateQue })

            //setQuetion(updateQue);
        }

    }
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                {steps.length !== 0 && (

                    <Score />
                )}
                <Typography component="h1" variant="h4" align="center">
                    Quize
                </Typography>
                {steps.length !== 0 && (
                    <Stepper activeStep={activeStep} sx={{
                        pt: 3, pb: 5, '& .MuiStep-horizontal': {
                            paddingLeft: '0px'
                        }
                    }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel></StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                )}


                {activeStep === steps.length ? (
                    <Summary />
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: "column" }}>
                        <Typography variant="headline" component="h5">
                            {question[activeStep]?.question}
                        </Typography>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={question[activeStep]?.answer || ""}
                            name={`Que${activeStep}`}
                            onChange={handleChange}

                        >
                            {question[activeStep]?.incorrect_answers?.map((opt, index) => {
                                const isbord = question[activeStep]?.correct_answer === opt && question[activeStep]?.border
                                return (
                                    <Box key={index} sx={{ paddingLeft: "5px", border: isbord ? "1px solid #27bb2b" : "unset" }}>
                                        <FormControlLabel value={opt} control={<Radio />} label={opt} />
                                    </Box>

                                )
                            })}

                        </RadioGroup>
                    </Box>
                )}


                <React.Fragment>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                Back
                            </Button>
                        )}
                        {activeStep === steps.length ?
                            (<Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/ganrate");
                                }}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                Start Again
                            </Button>) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    Next
                                </Button>
                            )}
                    </Box>
                </React.Fragment>

            </Paper>
            <Copyright />
        </Container>
    );
}