import {SET_PREV_MONTH, SET_NEXT_MONTH} from '../types'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

let initialState = { 
    currMonth : new Date()
}

export default function(state = initialState , action){
    switch(action.type){
        case SET_PREV_MONTH : 
            return {
                currMonth : subMonths(state.currMonth, 1 )
            }
        case SET_NEXT_MONTH : 
            return {
                currMonth : addMonths(state.currMonth, 1 )
            }
        default : 
            return {
                ...state
            }
    }
}