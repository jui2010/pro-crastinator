import {SET_AUTHENTICATED, LOADING_USER} from '../types'

const initialState = {
    authenticated : false,
    loading : false
}

export default function(state = initialState , action){
    switch(action.type){
        case SET_AUTHENTICATED :
            return {
                authenticated : true,
                loading : false
            }
        case LOADING_USER :
            return {
                ...state,
                loading : true
            }
        default : 
            return {
                ...state
            }
    }
}