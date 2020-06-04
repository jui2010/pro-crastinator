import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import homeImg from '../images/home.png'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = (theme) => ({
    ...theme.spread,
    gridMain : {
        fontFamily: 'Graphik Web,Helvetica Neue,Helvetica,Arial,sans-serif'
    }
    
})

;
class welcome extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
            <Grid container spacing={2} className={classes.gridMain} >
                <Grid item xs={3} >
                    <img src={homeImg} alt="home" />
                </Grid> 
                <Grid item xs={6} style={{textAlign:"center"}} >
                    <div style={{fontSize:"60px"}}>Are you a Pro at <span style={{fontSize:"50px"}}>procrastinating ??</span></div>
                    <h1>Dont worry ! We've got your back !</h1><br />
                    <Button  variant="contained" color="secondary" component = {Link} to="/signup"
                     ><b style={{fontSize:"20px",color:"white"}}>Get Started</b></Button>
                     <br/><br/><br/>
                
                </Grid>
                <Grid item xs={3} />
            </Grid>
<div style={{marginTop:'12px' ,fontWeight :900, letterSpacing: '3px', fontFamily: 'Dancing Script',position: 'absolute',zIndex:'100',fontSize: '12px',color:'black'}}><b>t h i s </b></div>

<span style={{fontSize: '30px',color:'#9fa8da',  letterSpacing: '1px',fontFamily: 'Bebas Neue'}}>This is some dummy text</span>
            </div>
          
        )
    }
}

export default withStyles(styles)(welcome)
