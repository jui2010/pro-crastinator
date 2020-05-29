import {SET_AUTHENTICATED , LOADING_USER, SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

export const signupUser = (newUser, history) => (dispatch) => {
    dispatch({
        type : LOADING_USER
    })
    axios.post('/signup', newUser)
        .then(res => {
            //store the token on local machine, so if page refreshes.. user doesnt have to login again
            setAuthorizationHeader(res.data.token)
            dispatch({
                type : SET_AUTHENTICATED
            })
            history.push('/home')
        })
        .catch(err => {
            console.log(err)
        })
}

export const loginUser = (newUser, history) => (dispatch) => {
    dispatch({
        type : LOADING_USER
    })
    axios.post('/login', newUser)
        .then(res => {
            //store the token on local machine, so if page refreshes.. user doesnt have to login again
            setAuthorizationHeader(res.data)
            dispatch({
                type : SET_AUTHENTICATED
            })
            history.push('/home')
        })
        .catch(err => {
            console.log(err)
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']

    dispatch({
        type : SET_UNAUTHENTICATED
    })
}

const setAuthorizationHeader = (token) => {   
    const FBIdToken = `Bearer ${token}`
    //store the token on local machine, so if page refreshes.. user doesnt have to login again
    localStorage.setItem('FBIdToken' , FBIdToken )
    axios.defaults.headers.common['Authorization'] = FBIdToken
}