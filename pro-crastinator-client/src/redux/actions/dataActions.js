import {SET_TODOS, LOADING_DATA, SET_TOGGLE_STATUS} from '../types'
import axios from 'axios'

//get the todo items
export const getTodos = () => (dispatch) => {
    dispatch({
        type : LOADING_DATA
    })
    axios.get('/getTodos')
    .then(res => {
        dispatch({
            type : SET_TODOS,
            payload : res.data
        })
    })
    .catch(err => console.log(err) )
}


//toggle the todo done field
export const toggleStatus = (todoId) => (dispatch) => {
    axios.get(`/toggleStatus/${todoId}`)
    .then(res => {
        dispatch({
            type : SET_TOGGLE_STATUS,
            payload : todoId
        })
    })
    .catch(err => console.log(err) )
}