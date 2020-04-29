import React, { Component,useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , FormControl,InputLabel,
  Select,MenuItem,OutlinedInput,Button} from '@material-ui/core';
import { PointPicker } from '../geometrypicker/pointpicker';
import { PolylinePicker } from '../geometrypicker/polylinepicker';
import { PolygonPicker } from '../geometrypicker/polygonpicker';
import { addGroupKernel } from './actions';

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

class AddKernel extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      kernelName:'',
      descInfo:'',
      geoType:'POINT',
      geomStyle:{
        type: "vector",
        fillColor: "rgba(64,169,255,0.8)",
        fillSize: 12,
        borderColor: "rgba(64,169,255,0.8)",
        borderSize: 1,
        url: ''
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
 
  addKernelClick = (event) => {
    if(this.state.kernelName)
    {

    }
    if(this.state.kernelName!=null && this.state.geoType.length>0)
    {
      this.props.addGroupKernel(this.state);
    }
  }
  styleOnChange = (style) =>{
    this.setState({geomStyle: style});
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
                          value={this.state.kernelName}
                          onChange={this.handleTextChange('kernelName')}
                          margin="normal"
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
                          margin="normal"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                          类型
                        </InputLabel>
                        <Select className={classes.select} 
                          value={this.state.geoType}
                          onChange={this.handleTextChange('geoType')}
                          >
                          <MenuItem value ='POINT' >点</MenuItem>
                          <MenuItem value ='LINE' >线</MenuItem>
                          <MenuItem value ='POLYGON'>面</MenuItem>
                        </Select>
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    {(this.state.geoType === 'POINT')&&<PointPicker onChange= {this.styleOnChange} />}
                    {(this.state.geoType === 'LINE')&&<PolylinePicker onChange= {this.styleOnChange}/>}
                    {(this.state.geoType === 'POLYGON')&&<PolygonPicker  onChange= {this.styleOnChange}/>}
                  </ListItem>
                  <ListItem>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} onClick= {this.addKernelClick.bind(this)}>
                              保存
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button}>
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
  addGroupKernel,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddKernel));