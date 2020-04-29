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
import { addKernelFeature } from './actions';


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

class AddFeature extends Component {

  constructor(props)
  {
    super(props);
    this.state ={
      featureName:'',
      geomStyle:{}
    }
  }

  handleFeatureNameChange = (event) =>
  {
    this.setState({ featureName: event.target.value});
  }

  addFeatureClick = () => {
    const { location } =  this.props;
    const kernel = location.params && location.params.kernel;
    if(this.state.featureName!=null && kernel)
    {
      const {classId } = kernel;
      this.props.addKernelFeature(classId, this.state).then(()=>{
        this.props.history.push({pathname:'/groupmanager/groupkernel/kernelfeature',params:{kernel:kernel}});
      });
    }
  }

  styleOnChange = (style) =>{
    this.setState({geomStyle: style});
  }

  componentWillMount(){
    
  }
  render() {
    const {classes,location} = this.props;
    const kernel = location.params && location.params.kernel;
    const geoType = kernel&&kernel.geoType;
    return (
        <Paper className={classes.root}>
            <List>
                <ListItem>
                    <TextField
                        id="standard-name"
                        label="名称"
                        className={classes.textField}
                        value={this.state.featureName}
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
                  {geoType&&(geoType === 'POINT')&&<PointPicker onChange= {this.styleOnChange} />}
                  {geoType&&(geoType === 'LINE')&&<PolylinePicker onChange= {this.styleOnChange}/>}
                  {geoType&&(geoType === 'POLYGON')&&<PolygonPicker  onChange= {this.styleOnChange}/>}
                </ListItem>
                <ListItem>
                    <Typography>
                        <Button variant="contained" size="large" color="primary" className={classes.button} 
                          onClick= {this.addFeatureClick.bind(this)}>
                            确定
                        </Button>
                        <Button variant="contained" size="large" color="primary" className={classes.button}>
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
  addKernelFeature,
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AddFeature));