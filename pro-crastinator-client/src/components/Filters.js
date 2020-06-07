import React, { Component } from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip'

import {setStatusFilter, setLabelFilter} from '../redux/actions/uiActions'

const styles = (theme) => ({
    ...theme.spread,
    statusBody : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    heading : {
      fontFamily: 'Bebas Neue',
      fontSize : '22px',
      color : '#212121',
      letteSpacing : '0.5px'
    }
})

const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#61b460',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#61b460',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid #81847a`,
      backgroundColor: '#d3d8c6',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

export class Filters extends Component {

    state = {
        statusFilter : 'none',
        labelFilter : 'none'
    }

    handleStatusFilter = (status) => {
        this.setState({
            statusFilter : status
        })
        this.props.setStatusFilter(status)
    }

    handleLabelFilter = (label) => {
        this.setState({
            labelFilter : label
        })
        this.props.setLabelFilter(label)
    }

    render(){
        const { classes } = this.props
        return (
            <div>
                <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary
                    expandIcon={<FormControlLabel
                        control={<IOSSwitch  onChange={() => this.handleStatusFilter('none')}/>}
                    />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                        <Typography className={classes.heading} ><b>Status</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.statusBody}>
                        <Chip className={classes.chip} color={this.state.statusFilter === "complete" ? "primary" : ""} label="Complete" onClick = { () => this.handleStatusFilter('complete')}/>
                        <Chip className={classes.chip} color={this.state.statusFilter === "ongoing" ? "primary" : ""} label="On-going" onClick = { () => this.handleStatusFilter('ongoing')}/>
                        <Chip className={classes.chip} color={this.state.statusFilter === "new" ? "primary" : ""} label="New" onClick = { () => this.handleStatusFilter('new')}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary
                    expandIcon={<FormControlLabel
                        control={<IOSSwitch onChange={() => this.handleLabelFilter('none')}/>}
                    />}
                    aria-controls="panel2a-content"
                    id="panel2a-header" >
                        <Typography className={classes.heading}><b>Labels</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.statusBody}>
                        <Chip className={classes.chip} color={this.state.labelFilter === "personal" ? "primary" : "#c5cae9"} 
                        label="Personal" onClick = { () => this.handleLabelFilter('personal')}/>
                        <Chip className={classes.chip} color={this.state.labelFilter === "office" ? "primary" : "#f8bbd0"} 
                        label="Office" onClick = { () => this.handleLabelFilter('office')}/>
                        <Chip className={classes.chip} color={this.state.labelFilter === "shopping" ? "primary" : "#b2dfdb"} 
                        label="Shopping" onClick = { () => this.handleLabelFilter('shopping')}/>
                        <Chip className={classes.chip} color={this.state.labelFilter === "general" ? "primary" : "#bbdefb"} 
                        label="General" onClick = { () => this.handleLabelFilter('general')}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data : state.data,
    UI : state.UI
})

const mapActionToProps =  {setStatusFilter, setLabelFilter} 

export default  connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Filters))

