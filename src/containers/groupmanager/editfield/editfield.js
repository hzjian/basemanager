import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , FormControl,InputLabel,
  Select,MenuItem,Button} from '@material-ui/core';
import { saveKernelField } from './actions';


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
}); 

class EditField extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      attrId:'',
      attrName:'',
      attrDesc:'',
      attrType:'',
      attrFgrade:'',
      maxValue:null,
      minValue:null,
      dictId:'',
    }
  }
  handleTextChange = (name) =>(event) =>
  {
    this.setState({ [name]: event.target.value});
  }

  saveAttrClick = () => {
    const { location } =  this.props;
    const attr = location.params && location.params.attr;
    if(attr && attr.attrName)
    {
      const kernel = location.params && location.params.kernel;
      this.props.saveKernelField(this.state).then(()=>{
        this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfield',params:{kernel:kernel}});
      });
    }
  }

  cancelAttrClick =() =>{
    const {location} = this.props;
    const kernel = location.params && location.params.kernel;
    this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfield',params:{kernel:kernel}});
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.attrId === '')
    {
      if(nextProps.location && nextProps.location.params && nextProps.location.params.attr)
      {
          return {...nextProps.location.params.attr};
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
                          label="字段名称"
                          className={classes.textField}
                          value={this.state.attrName}
                          onChange={this.handleTextChange('attrName')}
                          margin="normal"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem dense>
                      <TextField
                          id="standard-name"
                          label="字段描述"
                          className={classes.textField}
                          value={this.state.attrDesc}
                          onChange={this.handleTextChange('attrDesc')}
                          margin="normal"
                          variant="outlined"
                          multiline
                          rows="4"
                      />
                  </ListItem>
                  <ListItem dense>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        字段类型
                      </InputLabel>
                      <Select className={classes.select} 
                        value={this.state.attrType}
                        onChange={this.handleTextChange('attrType')}
                        >
                        <MenuItem value ='STRING'>文本</MenuItem>
                        <MenuItem value ='INTEGER'>整型</MenuItem>
                        <MenuItem value ='DOUBLE'>浮点</MenuItem>
                        <MenuItem value ='DATETIME'>时间</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                  <ListItem dense>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="age-label-placeholder">
                        存储等级
                      </InputLabel>
                      <Select className={classes.select} 
                        value={this.state.attrFgrade}
                        onChange={this.handleTextChange('attrFgrade')}
                        >
                        <MenuItem value ='NORMAL'>全局级</MenuItem>
                        <MenuItem value ='TASKGRADE'>任务级</MenuItem>
                        <MenuItem value ='USERGRADE'>用户级</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                 
                  <ListItem dense>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.saveAttrClick.bind(this)}>
                              确定
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.cancelAttrClick.bind(this)}>
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
  saveKernelField,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditField));