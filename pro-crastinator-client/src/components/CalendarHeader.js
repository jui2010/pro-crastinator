import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import format from "date-fns/format"

import MyButton from '../components/MyButton'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@material-ui/core/IconButton'

import {connect} from 'react-redux'
import {getPrevMonth, getNextMonth} from '../redux/actions/uiActions'

const styles = (theme) => ({
  ...theme.spread,
  currMonth : {
    textAlign : 'center',
    fontFamily: 'Bebas Neue',
    fontSize: '40px',
    color:'#9fa8da',
    letterSpacing: '1px'
  }
})

export class CalendarHeader extends Component {

  nextMonth = () => {
    this.props.getNextMonth()
  }

  prevMonth = () => {
    this.props.getPrevMonth()
  }

  render() {
    const {classes} = this.props
    const { currMonth} = this.props.UI 
      return (
        <Grid container >
          <Grid item xs ={1}>
            <IconButton  onClick={this.prevMonth} style={{position:'absolute', zIndex:1000}}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>

          <Grid item xs ={10} className={classes.currMonth} >
            {/* {format(currMonth , 'MMMM yyyy')} */}
            <div style={{left:'0',right:'0',marginLeft:'auto',marginRight:'auto',paddingLeft: '8px', marginTop:'14px' ,fontWeight :700, letterSpacing: '15px', fontFamily: 'Sacramento',position: 'absolute',zIndex:'100',fontSize: '27px',color:'black',textTransform:'lowercase'}}>
              <b>{format(currMonth , 'MMMM')}</b>  <sub style={{fontSize: '10px', letterSpacing: '5px', color:'transparent'}}>{format(currMonth , 'yyyy')} </sub>
            </div>
            {/* <div style={{paddingLeft: '470px', paddingRight: '480px', marginTop:'12px' ,fontWeight :900, letterSpacing: '10px', fontFamily: 'Dancing Script',position: 'absolute',zIndex:'10',fontSize: '25px',color:'black',textTransform:'lowercase'}}><b>{format(currMonth , 'MMMM')}</b></div> */}
            <div style={{fontSize: '50px',color:'#d1c4e9',  letterSpacing: '6px',fontFamily: 'Bebas Neue'}}>
              {format(currMonth , 'MMMM')}  <sub style={{fontSize: '20px',color: '#9575cd'}}>{format(currMonth , 'yyyy')} </sub>
            </div>
            
          </Grid>

          <Grid item xs ={1}>
            <IconButton  onClick={this.nextMonth} style={{position:'absolute', zIndex:1000,margin:'auto 0px auto 57px'}} >
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
      </Grid>
      )
  }
}

const mapStateToProps = (state) => ({
  data : state.data,
  UI : state.UI
})

const mapActionsToProps = {
  getPrevMonth,
  getNextMonth
}

export default connect(mapStateToProps , mapActionsToProps )(withStyles(styles)(CalendarHeader))
