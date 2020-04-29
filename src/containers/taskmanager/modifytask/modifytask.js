import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , FormControl,InputLabel,
        Select,MenuItem,OutlinedInput,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { loadTaskInfo,saveTaskInfo} from './actions';

const styles = theme => ({
    root:{
        width: '100%',
        height: '100%',
        overflow: 'auto', 
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 500,
    },
    password: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
    }
  });

class ModifyTask extends Component {

    state ={
        taskId:'',
        taskName:'',
        taskDesc:'',
        taskCode:'',
        kernelName:'',
        kernelId:'',
    }
    handleValueChange = (name) =>(event) =>{
        this.setState({[name]:event.target.value});
    }

    saveTaskInfo = (event) =>{
        this.props.saveTaskInfo(this.state).then(()=>{
            this.props.history.push({pathname:'/utaskmanager/tasklist'});
        });
    }
    cancelTaskClick =() =>{
        this.props.history.push({pathname:'/utaskmanager/tasklist'});
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(prevState);
        if(prevState.taskId === '')
        {
            if(nextProps.compData && nextProps.compData.taskInfo)
            {
                return {...nextProps.compData.taskInfo};
            }
            else
            {
                return null;
            }
        }
    }

    componentDidMount()
    {
        const { params } =  this.props.location;
        if(params && params.taskId)
        {
            const taskId = params.taskId;
            console.log(params.taskId);
            this.props.loadTaskInfo(taskId);
        }
    }
    render() {
        const { classes } =  this.props;
        return (
            <Paper className={classes.root}>
                <List>
                    <ListItem>
                        <TextField
                            id="standard-name"
                            label="任务名称"
                            className={classes.textField}
                            value={this.state.taskName}
                            onChange={this.handleValueChange('taskName')}
                            margin="dense"
                            variant="outlined"
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            id="standard-name"
                            label="任务描述"
                            className={classes.textField}
                            value={this.state.taskDesc}
                            onChange={this.handleValueChange('taskDesc')}
                            margin="dense"
                            variant="outlined"
                            multiline
                            rows="4"
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            id="date"
                            label="任务截止时间"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            id="outlined-password-input"
                            label="任务口令"
                            className={classes.password}
                            type="password"
                            autoComplete="current-password"
                            value={this.state.taskCode}
                            onChange={this.handleValueChange('taskCode')}
                            margin="dense"
                            variant="outlined"
                        />
                    </ListItem>
                    <ListItem>
                        <Typography>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.saveTaskInfo.bind(this)}>
                                保存
                            </Button>
                            <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.cancelTaskClick.bind(this)}>
                                取消
                            </Button>
                        </Typography>
                    </ListItem>
                </List>
            </Paper>
        );
    }
}


const mapStateToProps = state =>({
    compData:state.modifyTaskData
});

const mapDispatchToProps = {
    loadTaskInfo,
    saveTaskInfo
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ModifyTask));