import axios from 'axios';
import API from '../Api';

export function register(params) {
    return axios.post(API.REGISTER, params)
}


export function login(params) {
    return axios.post(API.LOGIN, params)
}