import React, { Component,useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem ,Button} from '@material-ui/core';
import { PointPicker } from '../geometrypicker/pointpicker';
import { PolylinePicker } from '../geometrypicker/polylinepicker';
import { PolygonPicker } from '../geometrypicker/polygonpicker';
import { saveGroupKernel } from './actions';

const styles = theme => ({
  root: {
      width: '100%',
      height: '100%',
      overflow: 'auto', 
      padding: '2px 4px',
    },
    rankItemInput:{
      width: '100px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: 500,
      height: 48,
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


class EditKernel extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      classId:'',
      className:'',
      descInfo:'',
      geoType:'',
      geomStyle:{
      },
    }
  }
  getDefaultSymbol = (geoType) => {
    let symbol = null;
    if (geoType === "POINT") {
        symbol = {
            type: "vector",
            fillColor: "rgba(64,169,255,0.8)",
            fillSize: 12,
            borderColor: "rgba(64,169,255,0.8)",
            borderSize: 1
        };
    }
    else if (geoType === "LINE") {
        symbol = {
            color: "rgba(64,169,255,0.8)",
            size: 4,
            dash: "0"
        };
    }
    else if (geoType === "POLYGON") {
        symbol = {
            fillColor: "rgba(64,169,255,0.3)",
            borderColor: "rgba(255,255,255,0.8)",
            borderSize: 2,
            borderDash: "0"
        };
    }
    return symbol;
  }

  handleTextChange = (name) =>(event) =>
  {
    this.setState({ [name]: event.target.value});
  }
 
  saveKernelClick = (event) => {
    if(this.state.className!=null && this.state.geoType.length>0)
    {
      this.props.saveGroupKernel(this.state).then(()=>{
        this.props.history.push({pathname:'/groupmanager/groupkernel'});
      });
    }
  }
  cancelKernelClick =() =>{
    this.props.history.push({pathname:'/groupmanager/groupkernel'});
  }

  styleOnChange = (style) =>{
    this.setState({geomStyle: style});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.classId === '')
    {
      if(nextProps.location && nextProps.location.params && nextProps.location.params.kernel)
      {
          return {...nextProps.location.params.kernel};
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
              <List dense >
                  <ListItem>
                      <TextField
                          id="standard-name"
                          label="名称"
                          className={classes.textField}
                          value={this.state.className}
                          onChange={this.handleTextChange('className')}
                          margin="dense"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem>
                      <TextField
                          id="standard-name"
                          label="描述"
                          className={classes.textField}
                          value={this.state.descInfo}
                          onChange={this.handleTextChange('descInfo')}
                          margin="dense"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem>
                    {(this.state.geoType === 'POINT')&&<PointPicker  style = {this.state.geomStyle}  onChange= {this.styleOnChange} />}
                    {(this.state.geoType === 'LINE')&&<PolylinePicker style = {this.state.geomStyle}  onChange= {this.styleOnChange}/>}
                    {(this.state.geoType === 'POLYGON')&&<PolygonPicker style = {this.state.geomStyle}  onChange= {this.styleOnChange}/>}
                  </ListItem>
                  <ListItem>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.saveKernelClick.bind(this)}>
                              保存
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.cancelKernelClick.bind(this)}>
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

const mapStateToProps = state =>({
  addKernelData: state.addKernelData,
});

const mapDispatchToProps = {
  saveGroupKernel,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditKernel));