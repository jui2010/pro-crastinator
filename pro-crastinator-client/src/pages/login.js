import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
//import CircularProgress from '@material-ui/core/CircularProgress'

import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

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

class login extends Component {
    constructor(){
        super()
        this.state = {
            email : '',
            password : ''     
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const newUser = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.loginUser(newUser , this.props.history)
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={2} className ={classes.form} >
                <Grid item={true} sm /> 
                <Grid item={true} sm >
                    <Typography variant="h4" className={classes.pageTitle}>
                        Login
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

                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Login
                        </Button>
                        <br />
                        <small>Dont have an account ? Sign up <Link to="/signup" >here</Link></small>
                    </form>
                </Grid> 
                <Grid item={true} sm /> 
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps , {loginUser})(withStyles(styles)(login))
