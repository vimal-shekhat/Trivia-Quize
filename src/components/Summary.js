
import React, { useContext } from 'react';
import { QuizContext } from '../store/Index';
import { Box, IconButton, Paper } from "@mui/material";
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Typography from '@mui/material/Typography';

export default function Summary() {

    const { quizeData } = useContext(QuizContext)
    const { question } = quizeData

    return (
        <Box sx={{ hieght: "40vh" }}>
            <Box sx={{ display: 'flex', flexDirection: "column" }}>
                {question?.map((questionItem, index) => {
                    return (
                        <Paper key={index} sx={{ margin: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} variant="outlined">
                            <Typography variant="h6" component="h5">
                                {questionItem?.question}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                <div>
                                    Anser:{questionItem?.correct_answer}
                                    <IconButton color="success">
                                        <CheckSharpIcon />
                                    </IconButton>
                                </div>
                                Attempt
                                {questionItem?.attempt ? (
                                    <IconButton >
                                        <ThumbUpIcon />
                                    </IconButton>

                                ) : (
                                    <IconButton >
                                        <ThumbDownAltIcon />
                                    </IconButton>

                                )}
                            </Typography>
                        </Paper>
                    )

                })}
                {question?.length === 0 && (
                    <Paper sx={{ margin: "10px", display: "flex", justifyContent: "space-between" }} variant="outlined">

                        <Typography variant="h6" component="h6">
                            No Quize Questions available
                        </Typography>
                    </Paper>

                )}

            </Box>
        </Box>
    )
}
