import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
import homeImg from '../images/home.png'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const styles = (theme) => ({
    ...theme.spread,
    gridMain : {
        fontFamily: 'Bebas Neue'
    }
})


class welcome extends Component {
    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={2} className={classes.gridMain} >

                <Grid item xs={8} style={{textAlign:"center"}} >
                    <div style={{fontSize:"110px", lineHeight : '20px', paddingTop : '100px'}}>Are you a Pro at <br/>
                    </div>
                    <div style={{fontSize:"98px"}}>
                        procrastinating ?
                    </div>
                    <div  style={{fontSize:"40px"}}>Dont worry!  &nbsp;&nbsp;We've got your back!</div><br />
                    <Button  variant="contained" color="secondary" component = {Link} to="/signup">
                        <b style={{fontSize:"25px",color:"white", fontFamily: 'Bebas Neue', letterSpacing : '3px'}}>Get Started</b>
                    </Button>
                </Grid>
                <Grid item xs={4} >
                    <img src={homeImg} alt="home" style={{width: '100%'}}/>
                </Grid>
            </Grid>          
        )
    }
}

export default withStyles(styles)(welcome)
