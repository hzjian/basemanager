import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button} from '@material-ui/core';
import { saveGroupDict } from './actions';


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
      margin: theme.spacing(2),
    },
}); 

class EditDict extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      dictId:'',
      dictName:'',
      dictDesc:'',
    }
  }
  handleTextChange = (name) =>(event) =>
  {
    this.setState({ [name]: event.target.value});
  }

  saveDictClick = () => {
    const { location } =  this.props;
    const dict = location.params && location.params.dict;
    if(dict && dict.dictName)
    {
      this.props.saveGroupDict(this.state).then(()=>{
        this.props.history.push({pathname:'/groupmanager/groupdict',params:{dict:dict}});
      });
    }
  }

  cancelDictClick =() =>{
    const {location} = this.props;
    const dict = location.params && location.params.dict;
    this.props.history.push({pathname:'/groupmanager/groupdict',params:{dict:dict}});
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.dictId === '')
    {
      if(nextProps.location && nextProps.location.params && nextProps.location.params.dict)
      {
          return {...nextProps.location.params.dict};
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
      <div className = {classes.root}>
        <Paper className={classes.root}>
              <List>
                  <ListItem dense>
                      <TextField
                          id="standard-name"
                          label="名称"
                          className={classes.textField}
                          value={this.state.dictName}
                          onChange={this.handleTextChange('dictName')}
                          margin="dense"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem dense>
                      <TextField
                          id="standard-name"
                          label="描述"
                          className={classes.textField}
                          value={this.state.dictDesc}
                          onChange={this.handleTextChange('dictDesc')}
                          margin="dense"
                          variant="outlined"
                          multiline
                          rows="4"
                      />
                  </ListItem>
                  <ListItem dense>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.saveDictClick.bind(this)}>
                              确定
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelDictClick.bind(this)}>
                              取消
                          </Button>
                      </Typography>
                  </ListItem>
              </List>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = () =>({
});

const mapDispatchToProps = {
  saveGroupDict,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditDict));