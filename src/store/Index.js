
import React, { createContext, useReducer } from 'react';
import { quizeReducer } from '../reducers/Reducer';
export const QuizContext = createContext();

const QuizeContextProvider = (props) => {

    const [quizeData, dispatch] = useReducer(quizeReducer, [])

    // const sortedTasks = tasks.sort((t, f) => (f.isChecked === t.isChecked) ? 0 : f.isChecked ? -1 : 1);

    return (
        <QuizContext.Provider value={{ quizeData, dispatch }}>
            {props.children}
        </QuizContext.Provider>
    )
}
export default QuizeContextProvider;