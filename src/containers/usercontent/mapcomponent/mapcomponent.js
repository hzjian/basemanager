/* jshint esversion : 6 */
import React, {Component} from "react";
import { connect } from 'react-redux';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import './toolbar/measure/leaflet.toolbar.css';
import './mapcomponent.css';

import L from 'leaflet';
import './toolbar/measure/leaflet.toolbar.js';
import './toolbar/measure/measure.js';
import './tool/visualclick';
import './tool/easybar';
import './tool/easybutton';
import  InfoBox from '../popup/infobox';
import  MapToolBar from './toolbar/maptoolbar';
import BaseMapPicker from './basemappicker/basemappicker';
import {updateMapBounds,fetchLayerData,saveGeoJsonData,fetchPropertiesData,
        clearSelection  } from "./actions";

class MapComponent extends Component {
    _map = null;
    _isPopup = false;
    _selectLayerGroup = null;
    _mainLayerGroup = null;
    _basemaps = {
        imgLayers: L.tileLayer('http://www.google.cn/maps/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
            maxZoom: 21,
            minZoom: 1,
            type: 'TILELAYER'
        }),
        rasterLayer:L.tileLayer('http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
                maxZoom: 21,
                minZoom: 1,
                type: 'TILELAYER'
            }),
        road:L.tileLayer('https://mt1.google.cn/vt/imgtp=png32&lyrs=h&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Ga', {
            maxZoom: 21,
            minZoom: 1,
            type: 'TILELAYER'
        })
    };

    constructor(props)
    {
        super(props);
        this._mapClickEvent.bind(this);
    }

    componentDidMount()
    {
        this._map = L.map("map", {
            layers: [this._basemaps.imgLayers,this._basemaps.road  /*,groups.biaozhu*/ ],
            doubleClickZoom: false,//不可以通过双击放大，因为双击的作用是添加矩形
            contextmenu: true,
            zoomControl:false,
            inertia:true,
            zoom: 16,
            //minZoom: 12,
            // maxBounds: [
            //     [32, 110],
            //     [32.5, 110.5]
            // ],
            contextmenuItems: [{
                text: 'Bookmark this position',
                callback: function (evt) {
                    this.fire('bookmark:new', {
                        latlng: evt.latlng
                    });
                }
            }]
        }).setView(new L.LatLng(32.2268, 110.2240), 14);
        //.setView(new L.LatLng(32.2268, 110.2240), 14);

        L.control.zoom({ zoomInTitle: '放大', zoomOutTitle: '缩小', position: 'topleft' }).addTo(this._map);

        const geoJsonLayer = new L.GeoJSON();
        this._map.addLayer(geoJsonLayer); 
        
        const drawnItems = new L.FeatureGroup();
        this._map.addLayer(drawnItems);

        this._mainLayerGroup = new L.FeatureGroup();
        this._map.addLayer(this._mainLayerGroup);

        this._selectLayerGroup = new L.FeatureGroup();
        this._map.addLayer(this._selectLayerGroup);

        //this._map.getPane('overlayPane').on("click",this._mapClickEvent);
        //this._mainLayerGroup.on("click",this._mapClickEvent);
        var x0=this._map.getBounds()._northEast.lat;
        var y0=this._map.getBounds()._northEast.lng;
        var x1=this._map.getBounds()._southWest.lat;
        var y1=this._map.getBounds()._southWest.lng;
        var latlngs = [[x0, y0],[x1,y0],[x1,y1],[x0,y1]];
        var polygon = L.polygon(latlngs, {color: 'red'});
        this.props.updateMapBounds(polygon.toGeoJSON().geometry);
        this._map.on('moveend', this._viewChangeEvent.bind(this));

        var measureline = L.ComputeDist.extend({
            options: {
                toolbarIcon: {
                    html: '<div class="toolbar_measuerline" title="测距"></div>',
                    tooltip: '测距'
                }
            }
        });
        var measurearea = L.ComputeArea.extend({
            options: {
                toolbarIcon: {
                    html: '<div class="toolbar_measuerarea" title="测面"></div>',
                    tooltip: '测面'
                }
            }
        });
        
        new L.Toolbar2.Control({position: 'topleft',actions: [measureline, measurearea]}).addTo(this._map);
    }

    _basePaneClickEvent = (evt) =>{
        L.DomEvent.stopPropagation(evt);
    }
    _mapClickEvent = (evt) => {
        console.log(evt);
        L.DomEvent.stopPropagation(evt);
        if(typeof(evt.layer) == 'undefined')
        {
            //infowindow close
            //this.props.closePop();
            this.props.clearSelection();
        }
    };

    _geoLayerClickEvent = (fealist) =>(evt)=>{
        L.DomEvent.stopPropagation(evt);
        console.log("click");
        this._selectLayerGroup.clearLayers();
        
        let tempLayer = L.geoJSON(evt.layer.feature,{
                style: function (feature) {
                    return {color: 'yellow'};
                },
                pointToLayer: function(feature, latlng){
                    if(feature.geometry.type && feature.geometry.type.toLowerCase() === 'point')
                    {
                        let tIcon = L.icon({
                            iconUrl: 'images/point.png',
                            iconSize:[24,24]
                            });
                        return L.marker(latlng, { icon: tIcon })
                    }
                }
            });
        /**
         * evt.layer.option 图层属性
        *       attrlist: Array(3)
                    0: {shareGrade: "GROUP", attrId: "dad80afe-fe55-4cda-bd95-0d335c9766a3", rankId: null, attrSeq: 2, attrFgrade: "NORMAL", …}
                    1: {shareGrade: "GROUP", attrId: "df7da4ea-97c0-428b-a5b7-5b80e867d8b8", rankId: null, attrSeq: 3, attrFgrade: "NORMAL", …}
                    2: {shareGrade: "GROUP", attrId: "1a534c00-7177-4e8f-803d-1b997197942f", rankId: null, attrSeq: 4, attrFgrade: "NORMAL", …}
                layerId: "9f374ac9-a5b5-47f1-8e98-fe46cc103e8f"
                layerName: "乡镇"
            evt.layer.feature.properties  要素属性
                anno: "城关镇"
                featureId: null
                id: "f52ec434-176f-4d5d-b680-d7211c8ab617"
                uid: null 
         */
        this.props.fetchPropertiesData(tempLayer,evt.layer.feature.properties,evt.target.options,fealist).then(() =>{
            this._selectLayerGroup.addLayer(tempLayer);
        });
    }

    _viewChangeEvent = (evt) =>{
        console.log(evt.target.getBounds());
        var x0=evt.target.getBounds()._northEast.lat;
        var y0=evt.target.getBounds()._northEast.lng;
        var x1=evt.target.getBounds()._southWest.lat;
        var y1=evt.target.getBounds()._southWest.lng;
        var latlngs = [[x0, y0],[x1,y0],[x1,y1],[x0,y1]];
        var polygon = L.polygon(latlngs, {color: 'red'});
        const mapbandsvalue = polygon.toGeoJSON().geometry;

        this.props.updateMapBounds(mapbandsvalue);
        this._mainLayerGroup.eachLayer((layer) =>{
            if(layer && layer.options.layerId){
                this.props.fetchLayerData(mapbandsvalue,layer.options.layerId);
            }
        });
    };

    //创建要素
    _createFeature = (geometry, symbol) => {
        const geoType = geometry.type.toLowerCase();//geoJson类型
        let feature = null;

        if (geoType === 'point') {
            const {type} = symbol;
            //矢量
            if (type === "vector") {
                feature = L.circleMarker([geometry.coordinates[1], geometry.coordinates[0]], {
                    fillColor: symbol.fillColor,
                    radius: symbol.fillSize,
                    color: symbol.borderColor,
                    weight: symbol.borderSize,
                    fillOpacity: 1
                });
            }
            //图片
            else {
                feature = L.marker([geometry.coordinates[1], geometry.coordinates[0]], {
                    icon: L.icon({
                        iconUrl: symbol.url,
                        // iconSize: [38, 95],
                        // iconAnchor: [22, 94],
                        // popupAnchor: [-3, -76]
                    })
                });
            }
        }
        else if (geoType === 'linestring') {
            const points = geometry.coordinates.map((point) => [point[1], point[0]]);
            feature = L.polyline(points, {
                color: symbol.color,
                weight: symbol.size,
                dashArray: symbol.dash,
                fillOpacity: 1,
                editing: {}
            });
        }
        else if (geoType === 'polygon') {
            const points = geometry.coordinates.map((ring) => {
                return ring.slice(0, ring.length - 1).map((point) => [point[1], point[0]]);
            });
            feature = L.polygon(points, {
                color: symbol.borderColor,
                weight: symbol.borderSize,
                fillColor: symbol.fillColor,
                dashArray: symbol.borderDash,
                fillOpacity: 1,
                editing: {}
            });
        }
        else if (geoType === 'multipolygon') {
            const points = geometry.coordinates.map((poly) => {
                return poly.map((ring) => {
                    return ring.slice(0, ring.length - 1).map((point) => [point[1], point[0]]);
                });
            });
            feature = L.polygon(points[0], {
                color: symbol.borderColor,
                weight: symbol.borderSize,
                fillColor: symbol.fillColor,
                dashArray: symbol.borderDash,
                fillOpacity: 1,
                editing: {}
            });
        }
        return feature;
    }

    
    /**
     * layerInfo
     *  attrlist: (4) [{…}, {…}, {…}, {…}]
        classId: "c4acdfae-af96-4b78-a35a-cb922921eb81"
        defaultStyle: {fillColor: "rgba(64, 255, 148, 0.3)", borderColor: "rgba(255,255,255,0.8)", borderSize: 2, borderDash: "0"}
        fealist: []
        geoData: (25) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        geoType: "POLYGON"
        layerGrade: "1"
        layerId: "6395b090-590e-462d-88cf-962589c6c677"
        layerName: "茶园"
     */

    //创建图层
    _createStyle= (geoType,symbol) => {
        let style = null;
        if (geoType === 'point') {
            const {type} = symbol;
            //矢量
            if (type === "vector") {
                style = {
                    fillColor: symbol.fillColor,
                    radius: symbol.fillSize,
                    color: symbol.borderColor,
                    weight: symbol.borderSize,
                    fillOpacity: 1
                };
            }
        }
        else if (geoType === 'linestring') {
            style = {
                color: symbol.color,
                weight: symbol.size,
                dashArray: symbol.dash,
                fillOpacity: 1,
                editing: {}
            };
        }
        else if (geoType === 'polygon') {
            style = {
                color: symbol.borderColor,
                weight: symbol.borderSize,
                fillColor: symbol.fillColor,
                dashArray: symbol.borderDash,
                fillOpacity: 0.5,
                editing: {}
            };
        }
        else if (geoType === 'multipolygon') {
            style = {
                color: symbol.borderColor,
                weight: symbol.borderSize,
                fillColor: symbol.fillColor,
                dashArray: symbol.borderDash,
                fillOpacity: 1,
                editing: {}
            };
        }
        return style;
    }
    _rebuildTaskLayer(taskData)
    {
        if(this._mainLayerGroup && taskData && taskData.layers && taskData.layers instanceof Array)
        {
            if( this._mainLayerGroup.getLayers()!=null && this._mainLayerGroup.getLayers().length>0)
            {
                this._mainLayerGroup.clearLayers();
                taskData.layers.map((item) =>{
                    var that = this;
                    const tmpLayer  = L.geoJSON(item.geoData,{layerId: item.layerId,
                        layerName: item.layerName,
                        attrlist: item.attrlist,
                        status: item.layerGrade,
                        style : function(feature){
                            /**
                             *  geometry:
                                    coordinates: [Array(5)]
                                    type: "Polygon"
                                properties: {uid: "791Z8C5Y", anno: "", id: "c6f782ad-8875-48c1-91ee-793e3a0118b2", featureId: null}
                                type: "Feature"
                             */
                            if(feature.properties&& feature.properties.featureId && feature.properties.featureId.length>1
                                 && item.fealist && item.fealist.length>0)
                            {
                                let fvalue = item.fealist.filter((f) =>{
                                    if(feature.properties.featureId === f.id )
                                        return f;
                                });
                                if(fvalue && fvalue.length > 0 && fvalue[0] && fvalue[0].geomStyle)
                                {
                                    return that._createStyle(feature.geometry.type.toLowerCase(),fvalue[0].geomStyle);
                                }
                            }
                            else
                            {
                                return that._createStyle(feature.geometry.type.toLowerCase(),item.defaultStyle);
                            }
                            return {};
                        },
                        pointToLayer: function(feature, latlng){
                            if(feature.geometry.type && feature.geometry.type.toLowerCase() === 'point')
                            {
                                if(feature.properties&& feature.properties.featureId && item.fealist && item.fealist.length>0)
                                {
                                    let fvalue = item.fealist.filter((f) =>{
                                        if(feature.properties.featureId === f.id )
                                            return f;
                                    });
                                    if(fvalue && fvalue.length > 0 && fvalue[0] && fvalue[0].geomStyle && fvalue[0].geomStyle.url.length>1)
                                    {
                                        let myIcon = L.icon({
                                            iconUrl: fvalue[0].geomStyle.url,
                                            iconSize: [25, 25],
                                        });
                                        return L.marker(latlng, { icon: myIcon })
                                        .bindTooltip(feature.properties.anno, { className: "ptlabel",interactive:false, offset: [0, 0] })
                                    }
                                }
                                else{
                                    let myIcon = L.icon({
                                        iconUrl: item.defaultStyle.url,
                                        iconSize: [25, 25],
                                    });
                                    return L.marker(latlng, { icon: myIcon })
                                    .bindTooltip(feature.properties.anno, { className: "ptlabel",interactive:false, offset: [0, 0] });
                                }
                                return L.marker(latlng);
                            }
                        },
                        onEachFeature:function (feature, layer) {
                            console.log(feature);
                            //if(feature.properties.anno && feature.properties.anno.trim().length>0)
                            
                            layer.bindTooltip(feature.properties.anno ||'', {
                                offset : [ 0, 0 ],// 偏移
                                direction : "right",// 放置位置
                                className : 'anim-tooltip',// CSS控制
                                opacity:0.9});
                            
                            if(feature.properties.anno)
                            {
                                var labelIcon = L.divIcon({
                                    html: feature.properties.anno,
                                    className: 'label-div-icon',
                                    iconSize:30
                                });
                                //polygon.getBounds().getCenter()
                                //if(this._mainLayerGroup)
                                //    L.marker(layer.getBounds().getCenter(), { icon: labelIcon }).addTo(this._map);
                            }
                        }
                    })
                    this._mainLayerGroup.addLayer(tmpLayer);
                    //this._mainLayerGroup.bringToBack();
                    tmpLayer.on("click",this._geoLayerClickEvent(item.fealist));
                });
            }
            else
            {
                taskData.layers.map((item) =>{
                    const tmpLayer  = L.geoJSON(item.geoData,{layerId: item.layerId,layerName: item.layerName,attrlist: item.attrlist,status: item.layerGrade});
                    if(item.defaultStyle)
                        tmpLayer.setStyle(item.defaultStyle);
                    this._mainLayerGroup.addLayer(tmpLayer);

                    var x0=this._map.getBounds()._northEast.lat;
                    var y0=this._map.getBounds()._northEast.lng;
                    var x1=this._map.getBounds()._southWest.lat;
                    var y1=this._map.getBounds()._southWest.lng;
                    var latlngs = [[x0, y0],[x1,y0],[x1,y1],[x0,y1]];
                    var polygon = L.polygon(latlngs, {color: 'red'});
                    const mapbandsvalue = polygon.toGeoJSON().geometry;
                    this.props.fetchLayerData(mapbandsvalue,item.layerId);
                });
            }
        }
    }
    componentWillReceiveProps(nextProps){
        //console.log(JSON.stringify(nextProps));
    }
    render()
    {           
        if(this.props.isUpdate)
        {
            this._rebuildTaskLayer(this.props.taskData);
        }
        //this.props.closeInfoBox();
        this._isPopup = this.props.isOpenPop;
        if(!this._isPopup && this._selectLayerGroup)
        {
            this._selectLayerGroup.clearLayers();
        }
        return (
                <div>
                    <div id = "map">
                    </div>
                    {this._isPopup?
                        <div className="infoboxpane" onClick = {this._basePaneClickEvent}>
                            <InfoBox/>
                        </div> :<div/>
                    }
                    <div className="toolbarpane">
                        <MapToolBar map ={this._map}  layerGroup ={this._mainLayerGroup}/>
                    </div>
                    <div className="basemappicker">
                        <BaseMapPicker map ={this._map} />
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state,ownProps)=> {
    let isUpdate = false;
    let layers = null;

    isUpdate = state.mapData.updateMap;
    if(state.mapData.layerList)
    {
        layers = state.mapData.layerList.map((layeritem) => {
            if(layeritem.layerId && layeritem.layerId === state.mapData.layerId)
            {
                layeritem.geoData = state.mapData.geoData;
            }
            return layeritem;
        });
    }
    return {
        taskId: state.mapData.taskId,
        taskData:{
            layers : layers
        },
        isOpenPop: state.mapData.openPop,
        isUpdate: isUpdate,
    }
};

const mapDispatchToProps = {
    updateMapBounds, 
    fetchLayerData,
    saveGeoJsonData,
    fetchPropertiesData,
    clearSelection,
};

export default connect(mapStateToProps,mapDispatchToProps)(MapComponent);
