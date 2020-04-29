import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , FormControl,InputLabel,
        Select,MenuItem,OutlinedInput,Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'; 
import * as moment from 'moment';

import { loadKernelList,createNewTask } from './actions';

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
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(1),
        width: 500,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    margin:{
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(2),
    }
  });

class CreateTask extends Component {

    state ={
        taskName:'',
        taskDes:'',
        kernelId:'',
        busPassword:'',
        startTime:moment().format("YYYY-MM-DD HH:mm:ss"),
        terminalTime:moment().format("YYYY-MM-DD HH:mm:ss"),

    }

    handleTaskNameChange = (event) =>{
        this.setState({taskName:event.target.value});
    }
    handleTaskDescChange = (event) =>{
        this.setState({taskDes:event.target.value});
    }
    handleKernelChange = (event) =>{
        this.setState({kernelId:event.target.value});
    }
    handlePasswordChange = (event) =>{
        this.setState ({busPassword:event.target.value});
    }
    handleSaveTaskClick = (event) =>{
        this.props.createNewTask(this.state).then(()=>{
            this.props.history.push({pathname:'/utaskmanager/tasklist'});
        });
    }
    cancelTaskClick =() =>{
        this.props.history.push({pathname:'/utaskmanager/tasklist'});
    }
    componentDidMount()
    {
        this.props.loadKernelList();
    }
    render() {
        const {classes,compData} =  this.props;
        let kernelListNode = (<MenuItem value=""><em>None</em></MenuItem>);
        if(compData.kernels && compData.kernels.length>0){
            kernelListNode = compData.kernels.map((item)=>{
                return (<MenuItem value={item.classId}>{item.className}</MenuItem>);
            });
        }
        return (
            <Paper className={classes.root}>
                <Typography>
                    <List>
                        <ListItem>
                            <TextField
                                id="standard-name"
                                label="任务名称"
                                className={classes.textField}
                                value={this.state.taskName}
                                onChange={this.handleTaskNameChange}
                                margin="dense"
                                variant="outlined"
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="standard-name"
                                label="任务描述"
                                className={classes.textField}
                                value={this.state.taskDes}
                                onChange={this.handleTaskDescChange}
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
                                margin="dense"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel  htmlFor="outlined-age-simple">
                                    核心对象
                                </InputLabel>
                                <Select
                                className={classes.textField}
                                value={this.state.kernelId}
                                onChange={this.handleKernelChange}
                                >
                                {kernelListNode}
                                </Select>
                            </FormControl>
                        </ListItem>
                        <listItem>
                            <TextField
                                id="outlined-password-input"
                                label="任务口令"
                                className={classes.password}
                                type="password"
                                autoComplete="current-password"
                                onChange={this.handlePasswordChange}
                                margin="dense"
                                variant="outlined"
                            />
                        </listItem>
                        <listItem>
                            <Typography>
                                <Button variant="contained" size="large" color="primary" className={classes.margin} onClick = {this.handleSaveTaskClick.bind(this)}>
                                    保存
                                </Button>
                                <Button variant="contained" size="large" color="primary" className={classes.margin} onClick = {this.cancelTaskClick.bind(this)}>
                                    取消
                                </Button>
                            </Typography>
                        </listItem>
                    </List>
                </Typography>
            </Paper>
        );
    }
}


const mapStateToProps = state =>({
    compData: state.createTaskData
});

const mapDispatchToProps = {
    loadKernelList,
    createNewTask
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CreateTask));