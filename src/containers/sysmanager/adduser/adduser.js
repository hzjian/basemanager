import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button} from '@material-ui/core';
import { addGroupUser } from './actions';


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

class AddUser extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      userName:'',
      userCnname:'',
      userPassword:'',
      userPassword2:'',
      userEmail:'',
    }
  }

  handleTextChange = (name) =>(event) =>
  {
    this.setState({ [name]: event.target.value});
  }
 
  addUserClick = () => {
    const { location } =  this.props;
    if(this.state.userName)
    {

    }


    if(this.state.userName!=null && this.state.userName.length>0 && location && location.params)
    {
      const {groupId } = location.params;
      this.props.addGroupUser(groupId, this.state).then(()=>{
        this.props.history.push({pathname:'/sysmanager/groupmgr/groupuser'});
      });
    }
  }

  cancelGroupHandle =() =>{
    this.props.history.push({pathname:'/sysmanager/groupmgr/groupuser'});
  }
  render() {
    const {classes} = this.props; 
    return (
      <Paper className={classes.root}>
        <List>
            <ListItem>
                <TextField
                    id="standard-name"
                    label="用户名称"
                    className={classes.textField}
                    value={this.state.userName}
                    onChange={this.handleTextChange('userName')}
                    margin="dense"
                    variant="outlined"
                />
            </ListItem>
            <ListItem>
                <TextField
                    id="standard-name"
                    label="中文名"
                    className={classes.textField}
                    value={this.state.userCnname}
                    onChange={this.handleTextChange('userCnname')}
                    margin="dense"
                    variant="outlined"
                />
            </ListItem>
            <ListItem>
                <TextField
                    id="standard-name"
                    label="密码"
                    type='password'
                    className={classes.textField}
                    value={this.state.userPassword}
                    onChange={this.handleTextChange('userPassword')}
                    margin="dense"
                    variant="outlined"
                />
            </ListItem>
            <ListItem>
                <TextField
                    id="standard-name"
                    label="确认密码"
                    type='password'
                    className={classes.textField}
                    value={this.state.userPassword2}
                    onChange={this.handleTextChange('userPassword2')}
                    margin="dense"
                    variant="outlined"
                />
            </ListItem>
            <ListItem>
                <TextField
                    id="standard-name"
                    label="邮箱"
                    className={classes.textField}
                    value={this.state.userEmail}
                    onChange={this.handleTextChange('userEmail')}
                    margin="dense"
                    variant="outlined"
                />
            </ListItem>
            <ListItem>
                <Typography>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.addUserClick.bind(this)}>
                        保存
                    </Button>
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelGroupHandle.bind(this)}>
                        返回
                    </Button>
                </Typography>
            </ListItem>
        </List>
      </Paper>
    )
  }
}

const mapStateToProps = state =>({
  groupUserData: state.groupUserData,
});

const mapDispatchToProps = {
  addGroupUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddUser));