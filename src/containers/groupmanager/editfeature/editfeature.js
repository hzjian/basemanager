import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField,Typography,List,ListItem , Button} from '@material-ui/core';
import PointSymbol from '../symbol/pointsymbol';
import LineSymbol from '../symbol/linesymbol';
import PolygonSymbol from '../symbol/polygonsymbol';
import { PointPicker } from '../geometrypicker/pointpicker';
import { PolylinePicker } from '../geometrypicker/polylinepicker';
import { PolygonPicker } from '../geometrypicker/polygonpicker';
import { saveKernelFeature } from './actions';


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

class EditFeature extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      id:'',
      name:'', 
      applyNum:'',
      geomStyle:{}
    }
  }

  handleFeatureNameChange = (event) =>
  {
    this.setState({ name: event.target.value});
  }

  saveFeatureClick = () => {
    const {location} = this.props;
    const kernel = location.params && location.params.kernel;
    this.props.saveKernelFeature(this.state).then(()=>{
      this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfeature',params:{kernel:kernel}});
    });
  }
  cancelFeatureClick =() =>{
    const {location} = this.props;
    const kernel = location.params && location.params.kernel;
    this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfeature',params:{kernel:kernel}});
  }

  styleOnChange = (style) =>{
    this.setState({geomStyle: style});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.id === '')
    {
      if(nextProps.location && nextProps.location.params && nextProps.location.params.feaData)
      {
          return {...nextProps.location.params.feaData};
      }
      else
      {
          return null;
      }
    }
  }
  render() {
    const {classes,location} = this.props;
    const kernel = location.params && location.params.kernel;
    const geoType = kernel && kernel.geoType;
    return (
        <Paper className={classes.root}>
              <List>
                  <ListItem>
                      <TextField
                          id={this.state.id}
                          label="名称"
                          className={classes.textField}
                          value={this.state.name}
                          onChange={this.handleFeatureNameChange}
                          margin="normal"
                          variant="outlined"
                      />
                  </ListItem>
                  <ListItem>
                    {geoType && (geoType === 'POINT') && <PointSymbol {...this.state.geomStyle} />}
                    {geoType && (geoType === 'LINE') && <LineSymbol {...this.state.geomStyle} />}
                    {geoType && (geoType === 'POLYGON') && <PolygonSymbol {...this.state.geomStyle} />}
                  </ListItem>
                  <ListItem>
                    {geoType&&(geoType === 'POINT')&&<PointPicker style={this.state.geomStyle}  onChange= {this.styleOnChange} />}
                    {geoType&&(geoType === 'LINE')&&<PolylinePicker style={this.state.geomStyle} onChange= {this.styleOnChange}/>}
                    {geoType&&(geoType === 'POLYGON')&&<PolygonPicker style={this.state.geomStyle}  onChange= {this.styleOnChange}/>}
                  </ListItem>
                  <ListItem>
                      <Typography>
                          <Button variant="contained" size="large" color="primary" className={classes.button} 
                           onClick= {this.saveFeatureClick.bind(this)}>
                              确定
                          </Button>
                          <Button variant="contained" size="large" color="primary" className={classes.button}
                            onClick= {this.cancelFeatureClick.bind(this)}>
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
  saveKernelFeature,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditFeature));