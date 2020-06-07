import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import format from "date-fns/format"

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

          {/* get previous month */}
          <Grid item xs ={1}>
            <IconButton  onClick={this.prevMonth} style={{position:'absolute', zIndex:1000}}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>

          {/* format the month-year on CalendarHeader */}
          <Grid item xs ={10} className={classes.currMonth} >
            <div style={{left:'0',right:'0',marginLeft:'auto',marginRight:'auto',paddingLeft: '8px', marginTop:'14px' ,fontWeight :700, letterSpacing: '15px', fontFamily: 'Sacramento',position: 'absolute',zIndex:'100',fontSize: '27px',color:'black',textTransform:'lowercase'}}>
              <b>{format(currMonth , 'MMMM')}</b>  <sub style={{fontSize: '10px', letterSpacing: '5px', color:'transparent'}}>{format(currMonth , 'yyyy')} </sub>
            </div>
            <div style={{fontSize: '50px',color:'#d1c4e9',  letterSpacing: '6px',fontFamily: 'Bebas Neue'}}>
              {format(currMonth , 'MMMM')}  <sub style={{fontSize: '20px',color: '#9575cd'}}>{format(currMonth , 'yyyy')} </sub>
            </div>
          </Grid>

          {/* get next month */}
          <Grid item xs ={1}>
            <IconButton onClick={this.nextMonth} style={{position:'absolute', zIndex:1000,margin:'auto 0px auto 57px'}} >
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
