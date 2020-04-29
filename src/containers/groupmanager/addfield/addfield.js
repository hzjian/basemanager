import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , FormControl,InputLabel,
  Select,MenuItem,Button} from '@material-ui/core';
import { addTaskField } from './actions';


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

class AddField extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      fieldName:'',
      fieldDesc:'',
      fieldType:'STRING',
      fieldGrade:'NORMAL',
    }
  }

  handleFieldNameChange = (event) =>
  {
    this.setState({ fieldName: event.target.value});
  }
  handleFieldDescChange = (event) =>{
    this.setState({ fieldDesc: event.target.value});
  }
  handleFieldTypeChange = (event) =>
  {
    this.setState({ fieldType: event.target.value});
  }
  handleFieldGradeChange = (event) =>
  {
    this.setState({ fieldGrade: event.target.value});
  }
  addFieldClick = () => {
    const { location } =  this.props;
    const kernel = location.params && location.params.kernel;
    if(this.state.fieldName!=null && this.state.fieldName.length>0 && location && location.params)
    {
      this.props.addTaskField(kernel.classId, this.state).then(()=>{
        this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfield',params:{kernel:kernel}});
      });
    }
  }

  cancelFieldClick =() =>{
    const {location} = this.props;
    const kernel = location.params && location.params.kernel;
    this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfield',params:{kernel:kernel}});
  }

  render() {
    const {classes} = this.props;
    return (
        <Paper className={classes.root}>
              <List>
                  <ListItem dense>
                      <TextField
                          id="standard-name"
                          label="字段名称"
                          className={classes.textField}
                          value={this.state.fieldName}
                          onChange={this.handleFieldNameChange}
                          margin="normal"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem dense>
                      <TextField
                          id="standard-name"
                          label="字段描述"
                          className={classes.textField}
                          value={this.state.fieldDesc}
                          onChange={this.handleFieldDescChange}
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
                        value={this.state.fieldType}
                        onChange={this.handleFieldTypeChange}
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
                        value={this.state.fieldGrade}
                        onChange={this.handleFieldGradeChange}
                        >
                        <MenuItem value ='NORMAL'>全局级</MenuItem>
                        <MenuItem value ='TASKGRADE'>任务级</MenuItem>
                        <MenuItem value ='USERGRADE'>用户级</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                 
                  <ListItem dense>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.addFieldClick.bind(this)}>
                              确定
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick = { this.cancelFieldClick.bind(this)}>
                              取消
                          </Button>
                      </Typography>
                  </ListItem>
              </List>
        </Paper>
    )
  }
}

const mapStateToProps = state =>({
  fieldData: state.fieldData
});

const mapDispatchToProps = {
  addTaskField,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddField));