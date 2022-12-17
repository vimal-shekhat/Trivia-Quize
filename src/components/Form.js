import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../store/Index';
import { LOAD_CATEGORY, LOAD_FORM } from "../constants/ActionTypes"

export default function Form() {
    const navigate = useNavigate();
    const { quizeData, dispatch } = useContext(QuizContext)
    const { category: cateGoryList, formdata } = quizeData;
    const [formValues, setFormValues] = useState({
        type: '',
        category: '',
        difficulty: '',
        number: 10,
    });

    const [errors, setErrors] = useState({
        type: false,
        category: false,
        difficulty: false,
        number: false,
    });


    useEffect(() => {
        const getCategories = async () => {
            const categorydata = await fetch('https://opentdb.com/api_category.php');
            const data = await categorydata.json();
            const { trivia_categories } = data;
            dispatch({ type: LOAD_CATEGORY, payload: trivia_categories })
        }
        const mapContextToForm = () => {
            if (!!formdata && Object.keys(formdata).length !== 0) {
                setFormValues(formdata)
            }
        }
        getCategories();
        mapContextToForm();
    }, [dispatch, formdata])

    const handleSubmit = () => {

        let objError = {}
        Object.keys(formValues).map((item) => {
            if (formValues[item] === "") {
                objError[item] = true
            }
            return item
        })
        if (Object.keys(objError).length === 0) {
            dispatch({ type: LOAD_FORM, payload: formValues })

            navigate('/quize')
        } else {
            setErrors(objError);

        }
    }
    const handleChange = (event) => {
        const data = formValues;
        setFormValues(
            {
                ...data,
                [event.target.name]: event.target.value
            }
        )

    }

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="questions"
                        name="number"
                        type="number"
                        value={formValues.number}
                        onChange={handleChange}
                        label="Number Of Questions"
                        fullWidth
                        variant="standard"
                        error={errors.number}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                        <InputLabel id="demo-simple-select-standard-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={formValues.category}
                            name="category"
                            onChange={handleChange}
                            label="Category"
                            error={errors?.category}
                        >
                            {cateGoryList?.map((cat) =>

                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                        <Select
                            labelId=" Type-simple-select-standard-label"
                            id="demo- Type-select-standard"
                            value={formValues.type}
                            name="type"
                            onChange={handleChange}
                            label="Type"
                            error={errors.type}
                        >
                            <MenuItem value={"any"}>Any Type</MenuItem>
                            <MenuItem value={"multiple"}>Multiple Choice</MenuItem>
                            <MenuItem value={"boolean"}>True / False</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                        <InputLabel id="demo-simple-select-standard-label">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty-simple-select-standard-label"
                            id="demo-difficulty-select-standard"
                            value={formValues.difficulty}
                            name="difficulty"
                            onChange={handleChange}
                            label="difficulty"
                            error={errors.difficulty}
                        >
                            <MenuItem value={"easy"}>Easy</MenuItem>
                            <MenuItem value={"medium"}>medium</MenuItem>
                            <MenuItem value={"hard"}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Next
                    </Button>

                </Grid>

            </Grid>
        </React.Fragment>
    );
}