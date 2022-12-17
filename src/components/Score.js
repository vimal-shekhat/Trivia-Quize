
import React, { useContext } from 'react';
import { QuizContext } from '../store/Index';
import { Box, Paper, Typography } from "@mui/material"
export default function Score() {
    const { quizeData } = useContext(QuizContext)
    const { question } = quizeData
    const getScore = () => {
        let score = 0;
        let attempt = 0;
        question?.map((item) => {
            if (item?.attempt) {
                attempt++;
            }
            if (item?.answer === item.correct_answer) {
                score++;
            }
            return item
        });
        return { score, attempt }

    }
    const { attempt, score } = getScore()

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Paper variant="elevation" sx={{ backgroundColor: "#1976d2", color: "white", my: { xs: 2, md: 2 }, p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" component="h5">
                    Score
                </Typography>
                <Typography variant="h5" component="h5">
                    {score} / {attempt}
                </Typography>
            </Paper>
        </Box>
    )
}
