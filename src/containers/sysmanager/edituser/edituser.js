import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { saveGroupUser } from './actions';


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
      marginLeft: theme.spacing(1),
      minWidth: 500,
    },
    select: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginLeft: theme.spacing(2),
    },
    snackbarwarn:{
      backgroundColor: theme.palette.primary.main,
    }
}); 

class EditUser extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      message:'',
      open:false,
      userName:'',
      userCnname:'',
      userPassword:'',
      userPassword2:'',
      userEmail:'',
    }
  }

  handleClose = () =>{
    this.setState({open:false});
  }
  handleTextChange = (name) =>(event) =>
  {
    this.setState({ [name]: event.target.value});
  }
 
  saveUserClick = () => {
    const { location } =  this.props;
    if(this.state.userName.trim==='')
    {
       this.setState({open:true,message:'username is not be null'});
       return;
    }

    if(this.state.userName!=null && this.state.userName.length>0 && location && location.params)
    {
      this.props.saveGroupUser(this.state).then(()=>{
        this.props.history.push({pathname:'/sysmanager/usermgr'});
      });
    }
  }

  cancelUserClick =() =>{
    this.props.history.push({pathname:'/sysmanager/usermgr'});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.userName === '')
    {
      if(nextProps.location && nextProps.location.params && nextProps.location.params.user)
      {
          return {...nextProps.location.params.user};
      }
      else
      {
          return null;
      }
    }
  }

  render() {
    const {classes} = this.props; 
    return (
      <div>
        <Paper className={classes.root}>
              <List>
                  <ListItem>
                      <TextField
                          id="standard-name"
                          label="用户名称"
                          className={classes.textField}
                          value={this.state.userName}
                          onChange={this.handleTextChange('userName')}
                          margin ="dense" variant="outlined"  //disabled
                      />
                  </ListItem>
                  <ListItem>
                      <TextField
                          id="standard-name"
                          label="中文名"
                          className={classes.textField}
                          value={this.state.userCnname}
                          onChange={this.handleTextChange('userCnname')}
                          margin ="dense"
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
                          margin ="dense"
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
                          margin ="dense"
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
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.saveUserClick.bind(this)}>
                              保存
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelUserClick.bind(this)}>
                              返回
                          </Button>
                      </Typography>
                  </ListItem>
              </List>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          className ={classes.snackbarwarn}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <SnackbarContent className={classes.snackbarwarn} message={this.state.message}
          action={[
                  <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                    <CloseIcon className={classes.icon} />
                  </IconButton>,
                ]}
          />
        </Snackbar>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  groupUserData: state.groupUserData,
});

const mapDispatchToProps = {
  saveGroupUser,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditUser));