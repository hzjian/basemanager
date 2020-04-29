import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button} from '@material-ui/core';
import { addNewGroup } from './actions';


const styles = theme => ({
  root: {
      width: '100%',
      height: '100%',
      overflow: 'auto', 
    },
    rankItemInput:{
      width: '100px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 500,
      height:30,
    },
    formControl:{
      margin: theme.spacing(1),
      minWidth: 500,
    },
    select: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(2),
    },
}); 


class AddGroup extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      groupCode:'',
      groupName:'',
      groupAddress:'',
      groupPic:'',
      groupService:'',
      groupPhone:'',
      groupStatus: 0
    }
  }

  handleChange = (name) =>(event) =>{
    this.setState({
      [name] : event.target.value,
    });
  }
  addGroupDataHandle = () => {
    if(this.state.groupCode!=null && this.state.groupName.length>0)
    {
      this.props.addNewGroup(this.state).then(()=>{
        this.props.history.push({pathname:'/sysmanager/groupmgr'});
      });
    }
  }

  cancelGroupHandle =() =>{
    this.props.history.push({pathname:'/sysmanager/groupmgr'});
  }

  render() {
    const {classes} = this.props;
    return (
        <Paper className={classes.root}>
              <List>
                  <ListItem>
                      <TextField id="standard-name" label="组织代码" className={classes.textField} value={this.state.groupCode}
                          onChange={this.handleChange('groupCode')}  margin="dense" variant="outlined"/>
                  </ListItem>
                  <ListItem>
                      <TextField id="standard-name" label="组织名称" className={classes.textField} value={this.state.groupName}
                          onChange={this.handleChange('groupName')}  margin="dense" variant="outlined"/>
                  </ListItem>
                  <ListItem>
                      <TextField id="standard-name" label="组织地址" className={classes.textField} value={this.state.groupAddress}
                          onChange={this.handleChange('groupAddress')}  margin="dense" variant="outlined"/>
                  </ListItem>
                  <ListItem>
                      <TextField id="standard-name" label="负责人" className={classes.textField} value={this.state.groupPic}
                          onChange={this.handleChange('groupPic')}  margin="dense" variant="outlined"/>
                  </ListItem>
                  <ListItem>
                      <TextField id="standard-name" label="电话" className={classes.textField} value={this.state.groupPhone}
                          onChange={this.handleChange('groupPhone')}  margin="dense" variant="outlined"/>
                  </ListItem>
                  <ListItem>
                      <TextField id="standard-name" label="状态" className={classes.textField} value={this.state.groupStatus}
                          onChange={this.handleChange('groupStatus')}  margin="dense" variant="outlined"/>
                  </ListItem>
                  <ListItem>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.addGroupDataHandle.bind(this)}>
                              确定
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelGroupHandle.bind(this)}>
                              取消
                          </Button>
                      </Typography>
                  </ListItem>
              </List>
        </Paper>
    )
  }
}

const mapStateToProps = () =>({
});

const mapDispatchToProps = {
  addNewGroup,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddGroup));