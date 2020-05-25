import {SET_PREV_MONTH, SET_NEXT_MONTH, SELECT_DATE } from '../types'


export const getPrevMonth = () => (dispatch) => {
    dispatch({
        type : SET_PREV_MONTH
    })
}

export const getNextMonth = () => (dispatch) => {
    dispatch({
        type : SET_NEXT_MONTH
    })
}

export const setSelectedDate = (day) => (dispatch) => {
    dispatch({
        type : SELECT_DATE,
        payload : day
    })
}