
import {
    LOAD_CATEGORY,
    LOAD_FORM,
    QUIZE_QUESTION
} from '../constants/ActionTypes.js';

export const quizeReducer = (state = [], action) => {


    switch (action.type) {
        case LOAD_CATEGORY:
            return {
                ...state,
                category: action.payload
            };

        case LOAD_FORM:
            return {
                ...state,
                formdata: action.payload
            };
        case QUIZE_QUESTION:
            return {
                ...state,
                question: action.payload
            };

        default:
            return state;
    }
}