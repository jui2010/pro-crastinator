import {SET_TODOS, LOADING_DATA, SET_TOGGLE_STATUS, POST_TODO, DELETE_TODO} from '../types'
import axios from 'axios'

//get the todo items
export const getTodos = () => (dispatch) => {
    dispatch({
        type : LOADING_DATA
    })
    axios.get('/getAuthenticatedUserDataAndTodos')
    .then(res => {
        dispatch({
            type : SET_TODOS,
            payload : res.data
        })
    })
    .catch(err => console.log(err) )
}

//post a todo
export const postTodo = (newTodo) => (dispatch) => {
    axios.post('/postTodo' , newTodo)
        .then(res => {
            dispatch({
                type : POST_TODO,
                payload : res.data
            })
        })
        .catch(err => console.log(err))
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

//delete a todo
export const deleteTodo = (todoId) => (dispatch) => {
    axios.delete(`/deleteTodo/${todoId}`)
        .then(() => {
            dispatch({
                type : DELETE_TODO,
                payload : todoId
            })
        })
        .catch(err => console.log(err))
}