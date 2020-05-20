import {SET_TODOS, LOADING_DATA, SET_TOGGLE_STATUS} from '../types'

const initialState = {
    todos : [],
    loading : false
}

export default function (state = initialState, action){
    switch(action.type){
        case LOADING_DATA : 
            return {
                ...state,
                loading : true
            } 
        case SET_TODOS : 
            return {
                ...state,
                todos : action.payload,
                loading : false
            } 
        case SET_TOGGLE_STATUS :
            let index = state.todos.findIndex(
                (todo) => todo.todoId === action.payload
                )
            if (state.todos[index].status === "complete"){
                state.todos[index].status = "new"
            } else {
                state.todos[index].status = "complete"
            }
            return {
                ...state,
            }
        default : 
            return {
                ...state
            }
    }
}