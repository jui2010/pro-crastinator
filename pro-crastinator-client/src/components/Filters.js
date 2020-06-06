import React, { Component } from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

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
})

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
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}><b>Status</b></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.statusBody}>
                        <Chip className={classes.chip} color={this.state.statusFilter === "complete" ? "primary" : ""} label="Complete" onClick = { () => this.handleStatusFilter('complete')}/>
                        <Chip className={classes.chip} color={this.state.statusFilter === "ongoing" ? "primary" : ""} label="On-going" onClick = { () => this.handleStatusFilter('ongoing')}/>
                        <Chip className={classes.chip} color={this.state.statusFilter === "new" ? "primary" : ""} label="New" onClick = { () => this.handleStatusFilter('new')}/>
                        <Chip className={classes.chip} color={this.state.statusFilter === "none" ? "primary" : ""} icon={<NotInterestedIcon style={{marginLeft : '16px'}}/>} onClick = { () => this.handleStatusFilter('none')}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
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
                        <Chip className={classes.chip} color={this.state.labelFilter === "none" ? "primary" : ""} 
                        icon={<NotInterestedIcon style={{marginLeft : '16px'}}/>} onClick = { () => this.handleLabelFilter('none')}/>
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

