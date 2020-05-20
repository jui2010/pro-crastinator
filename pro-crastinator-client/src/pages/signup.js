import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types'
//MUI 
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
//import CircularProgress from '@material-ui/core/CircularProgress'

//we get theme from MuiThemeProvider in the App.js
const styles = (theme) => ({
    ...theme.spread,
    pageTitle : {
        margin : '20px 0px 20px auto' ,
    },
    form : {
        textAlign : 'center'
    }
})

class signup extends Component {
    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            confirmPassword : '',
            username : ''
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const newUserData = {
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            username : this.state.username
        }
        console.log(newUserData)
        axios.post('/signup', newUserData)
        .then(res => {
            console.log(res.data)
            //store the token on local machine, so if page refreshes.. user doesnt have to login again
            //localStorage.setItem('FBIdToken' , `Bearer ${res.data}`)

            //redirect to the home page, incase login is successful
            this.props.history.push('/')
        })
        .catch(err => console.log(err)
        )
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        const { classes } = this.props

        //destructuring
        return (
            <Grid container spacing={2} className ={classes.form} >
                <Grid item={true} sm /> 
                <Grid item={true} sm >
                    <Typography variant="h4" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit ={this.handleSubmit }>

                        <TextField 
                        id ="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                      
                        value={this.state.email} 
                        onChange= {this.handleChange} fullWidth />

                        <TextField 
                        id ="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        value={this.state.password} 
                        onChange= {this.handleChange} fullWidth />

                        <TextField 
                        id ="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.textField}
                        value={this.state.confirmPassword} 
                        onChange= {this.handleChange} fullWidth />
                        
                        <TextField 
                        id ="username" 
                        name="username" 
                        type="text" 
                        label="username" 
                        className={classes.textField}
                        value={this.state.username} 
                        onChange= {this.handleChange} fullWidth />

                        
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Sign Up
                        </Button>
                        <br />
                        <small>Already have an account ? Login up <Link to="/login" >here</Link></small>
                    </form>
                </Grid> 
                <Grid item={true} sm /> 
            </Grid>
        )
    }
}


export default withStyles(styles)(signup)
