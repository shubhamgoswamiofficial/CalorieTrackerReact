import axios from 'axios';
import API from '../Api';

export function recordMeal(params) {
    return axios.post(API.RECORD_MEAL, params)
}

export function editMeal(params) {
    return axios.post(API.EDIT_MEAL, params)
}
export function deleteMeal(params) {
    return axios.post(API.DELETE_MEAL, params)
}
export function getMeals(params) {
    return axios.get(API.GET_MEAL, params)
}