import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import PlaceIcon from '@material-ui/icons/Place';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import Tooltip from '@material-ui/core/Tooltip';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import { withStyles } from '@material-ui/core/styles';

import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import * as moment from 'moment';
import { saveKernelData,updateKernelData } from './actions.js';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '48px',
    height: '32px'
  },
  button: {
    padding:0,
    width: '32px',
    height: '32px'
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 24,
  },
  input: {
    display: 'none',
  },
});

let drawStyle = {
    "point": {
      "type": "vector",
      "fillSize": 12,
      "fillColor": "rgba(255,0,0,0.8)",
      "borderColor": "rgba(255,0,0,0.8)",
      "borderSize": 1,
      "opacity": 1
    },
    "linestring": {
      "size": 4,
      "color": "rgba(255,0,0,0.8)",
      "dash": "0",
      "opacity": 1
    },
    "polygon": {
      "borderSize": 2,
      "borderColor": "rgba(255,0,0,0.8)",
      "borderDash": "0",
      "fillColor": "rgba(255,0,0,0.3)",
      "opacity": 1
    }
  };

let drawOption = {
    "point": {
        fillColor: drawStyle.point.fillColor,
        radius: drawStyle.point.fillSize,
        color: drawStyle.point.borderColor,
        weight: drawStyle.point.borderSize,
        fillOpacity: drawStyle.point.opacity
    },
    "polyline": {
        shapeOptions: {
            color: drawStyle.linestring.color,
            weight: drawStyle.linestring.size,
            dashArray: drawStyle.linestring.dash,
            fillOpacity: drawStyle.linestring.opacity
        }
    },
    "polygon": {
        shapeOptions: {
            color: drawStyle.polygon.borderColor,
            weight: drawStyle.polygon.borderSize,
            fillColor: drawStyle.polygon.fillColor,
            dashArray: drawStyle.polygon.borderDash,
            fillOpacity: drawStyle.polygon.opacity
        },
    }
};


export class DrawManager extends Component {
    _layerId = null;
    _geoType = null;
    _drawPointCmd = null;
    _drawPolylineCmd = null;
    _drawPolygonCmd = null;

    constructor(props)
    {
        super(props);

        this._initDrawTools();
        this._onDrawCreated.bind(this);
    }

    _initDrawCmd(){
        if(!this._drawPointCmd || !this._drawPolylineCmd || !this._drawPolygonCmd)
        {
            this._drawPointCmd = new L.Draw.Marker(this.props.map, drawOption["point"]);
            this._drawPolylineCmd = new L.Draw.Polyline(this.props.map, drawOption["polyline"]);
            this._drawPolygonCmd = new L.Draw.Polygon(this.props.map, drawOption["polygon"]);
            this._addEvents();
        }
    }

    _activeDrawType = (geoType) =>{
        switch (geoType)
        {
            case 'point':
                return this._drawPointCmd.enable();
            case 'polyline':
                return  this._drawPolylineCmd.enable();
            case 'polygon':
                return this._drawPolygonCmd.enable();
        }
    };

    _editorComponet = (geoType) =>
    {
        const { classes } = this.props;
        const editor = <Tooltip title="编辑"><IconButton color="primary" className={classes.button}  onClick = {() => this._activeDrawType('editor')}><CreateIcon /></IconButton></Tooltip>;
        return editor;
    }

    _drawComponet = (geoType) =>
    {
        const { classes } = this.props;
        const point =  <Tooltip title="绘图"><IconButton color="primary" className={classes.button}  onClick = {() => this._activeDrawType('point')}><CreateIcon /></IconButton></Tooltip>;
        const polyline = <Tooltip title="绘图"><IconButton color="primary" className={classes.button} onClick = {() => this._activeDrawType('polyline')}><CreateIcon /></IconButton></Tooltip>;
        const polygon = <Tooltip title="绘图"><IconButton color="primary" className={classes.button} onClick = {() => this._activeDrawType('polygon')}><CreateIcon /></IconButton></Tooltip>;
        const  defaultDiv = <div></div>
        switch (geoType)
        {
            case 'POINT':
                return  point;
            case 'LINE':
                return polyline;
            case 'POLYGON':
                return polygon;
            default :
                return defaultDiv;
        }
    }

    _onDrawCreated = (event) =>{
        var layer = event.layer;
        const geometry = event.layer.toGeoJSON().geometry;
        //this.props.map.addLayer(layer);

        this.props.saveKernelData( this._layerId,geometry);

    }
    _onDrawGeoEdit = (event) =>{
        console.log(event);
        //event.poly.feature
        //event.layer
        
        const name = moment().format("hh:mm:ss");

        const  tmpFeature = event.poly ? event.poly.toGeoJSON() : event.layer.toGeoJSON();
            
        this.props.updateKernelData(this._layerId,tmpFeature.properties.id , tmpFeature.geometry);
        
    }

    _addEvents = () => {
        //绑定地图和标绘图层的事件监听
        //this.map.on("draw:drawstart", this._onDrawStart);
        //this.map.on("draw:drawstop", this._onDrawStop);
        this.props.map.on("draw:created", this._onDrawCreated.bind(this));
        this.props.map.on("draw:editmove", this._onDrawGeoEdit.bind(this));
        //this.map.on("draw:editresize", this._onDrawGeoEdit);
        this.props.map.on("draw:editvertex", this._onDrawGeoEdit.bind(this));
    }

    _removeEvents = () => {
        //解绑地图和标绘图层的事件监听
        // this.map.off("draw:drawstart", this._onDrawStart);
        // this.map.off("draw:drawstop", this._onDrawStop);
        this.props.map.off("draw:created", this._onDrawCreated);
        this.props.map.off("draw:editmove", this._onDrawGeoEdit);
        // this.map.off("draw:editresize", this._onDrawGeoEdit);
        this.props.map.off("draw:editvertex", this._onDrawGeoEdit);
    }

    _initDrawTools = () => {
        //初始化标绘工具参数
        let draw = L.drawLocal.draw;
        draw.handlers = {
            marker: {
                tooltip: {
                    start: '单击地图标绘点'
                }
            },
            polyline: {
                error: '<strong>错误:</strong> 边不能交叉!',
                tooltip: {
                    start: '单击地图开始绘制线',
                    cont: '单击地图继续绘制线',
                    end: '单击最后一个点或双击完成'
                }
            },
            polygon: {
                tooltip: {
                    start: '单击地图开始绘制面',
                    cont: '单击地图继续绘制面',
                    end: '单击最后一个点或双击完成'
                }
            }
        };
  }

  render() {
    const { classes} = this.props;
    const { taskId,layerList} = this.props.taskData;
    if(layerList && layerList.length>0)
    {
        layerList.map((item) =>{
            if(item.layerGrade === '1')
            {
                this._layerId = item.layerId;
                this._geoType = item.geoType;
            }

        });
    }
    if(this.props.map)
    {
        this._initDrawCmd();
        if(this.props.drawData && this.props.drawData.saveResult){
            const feature = {
                "type":"Feature",
                "properties":{
                            "name":"lgd",
                            "amenity":"教育",
                            "popupContent":"I'm here!"
                        },
                "geometry":   this.props.drawData.geoJson  
            }

            this.props.layerGroup.eachLayer((layer) =>{
                if(layer && layer.options.status ==='1' ){
                    layer.addData(feature);
                }
            });
        }

    }
    return (
        <div className={classes.root}>
            {taskId && this._layerId && this._geoType && this._drawComponet(this._geoType)}
        </div>
    )
  }
}


const mapStateToProps = (state) =>({
    taskData:state.usertaskData,
    drawData:state.drawData,
});
  
const mapDispatchToProps = {
    saveKernelData,
    updateKernelData
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DrawManager));
