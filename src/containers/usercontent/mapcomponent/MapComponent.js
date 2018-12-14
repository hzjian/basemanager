import React, {Component} from "react";

import './MapComponent.css';
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "bootstrap/dist/css/bootstrap.min.css"
import img from '../imgs/marker-icon.png';

import L from 'leaflet';
import "leaflet-draw";
import "leaflet-groupedlayercontrol"

import {fetchTopmapgeojson,DrawAddMap} from "../actions/MapAction";

const  editlayer=new L.FeatureGroup();
const  drawlayer=new L.FeatureGroup();

var jsonlayer;
var editObject;
var editResult;
var editlatlngs;
var taskclassid;
var mapbandsvalue;

var groups = {
    //ImgLayers: L.tileLayer('http://www.google.cn/maps/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
    ImgLayers: L.tileLayer('http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
        maxZoom: 21,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.tulibj.com">Gamma</a> tuli'
    }),
    //影像地图标注
    biaozhu:L.tileLayer('http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}&s=Ga', {
        maxZoom: 21,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.tulibj.com">Gamma</a> tuli'
    })
};
var basemaps = {
    //影像地图
    // ImgLayers: L.tileLayer()
};
var layerconfig = {
    LayerGroups: groups,
    Basemaps:basemaps
};
class MapComponent extends Component {
    componentDidMount()
    {
        const {stateProxy} = this.props;
        this.stateProxy = stateProxy;
        this.map = L.map(this.mapDiv, {
            layers: [groups.ImgLayers  /*,groups.biaozhu*/ ],
            doubleClickZoom: false,//不可以通过双击放大，因为双击的作用是添加矩形
            contextmenu: true,
            zoomControl:false,
            zoom:12,
            minZoom: 3,
            contextmenuItems: [{
                text: 'Bookmark this position',
                callback: function (evt) {
                    this.fire('bookmark:new', {
                        latlng: evt.latlng
                    });
                    alert("123");
                }
            }]
        }).setView(new L.LatLng(24.291, 166.636), 3);
        var groupedOverlays = {
            "地图图层": {
                "影像地图": layerconfig.LayerGroups.ImgLayers,
                "标注图层": layerconfig.LayerGroups.biaozhu
            },
            "Gamma图层":{
                // "高铁数据": ""
            }

        };
        L.control.groupedLayers(layerconfig.Basemaps,groupedOverlays).addTo(this.map);
        this.map.on('layeradd', function (ev) {
            console.log(ev.layer._map.getBounds());
            var x0=ev.target.getBounds()._northEast.lat;
            var y0=ev.target.getBounds()._northEast.lng;
            var x1=ev.target.getBounds()._southWest.lat;
            var y1=ev.target.getBounds()._southWest.lng;
            var latlngs = [[x0, y0],[x1,y0],[x1,y1],[x0,y1]];
            var polygon = L.polygon(latlngs, {color: 'red'});
            mapbandsvalue=polygon.toGeoJSON().geometry;

        });

        L.control.zoom({ zoomInTitle: '放大', zoomOutTitle: '缩小', position: 'topright' }).addTo(this.map);

        this.map.addLayer(editlayer);
        this._setBaseMap();
        // this.map._onResize();
        const {dispatch} = this.props;
            this.map.on('moveend', function (ev) {

                console.log(ev.target.getBounds());
                var x0=ev.target.getBounds()._northEast.lat;
                var y0=ev.target.getBounds()._northEast.lng;
                var x1=ev.target.getBounds()._southWest.lat;
                var y1=ev.target.getBounds()._southWest.lng;
                var latlngs = [[x0, y0],[x1,y0],[x1,y1],[x0,y1]];
                var polygon = L.polygon(latlngs, {color: 'red'});
                mapbandsvalue=polygon.toGeoJSON().geometry;
                if(taskclassid!=null){
                    dispatch(fetchTopmapgeojson(mapbandsvalue,taskclassid));
                }
            });
        }

        _setBaseMap()
        {
            //增加绘制图层
            const drawnItems = new L.FeatureGroup();
            this.map.addLayer(drawnItems);
            this.map.addLayer(drawlayer);
            this.map.addLayer(editlayer);
            //标记图片
            var MyCustomMarker = L.Icon.extend({
                options: {
                    shadowUrl: null,
                    iconUrl: img
                }
            });

            var options = {
                position: 'topright',
                draw: {
                    circle: false, // Turns off this drawing tool
                    rectangle: false,
                    circlemarker: false,
                    marker: {
                        icon: new MyCustomMarker()
                    },
                    polyline: {
                        shapeOptions: {
                            color: '#f357a1',
                            weight: 5
                        }
                    },
                    polygon: {
                        shapeOptions: {
                            color: '#bada55'
                        }
                    }
                },
                edit: {
                    featureGroup: editlayer, //REQUIRED!!
                    remove: false
                }
            };

            var drawControl = new L.Control.Draw(options);
            this.map.addControl(drawControl);
            const {dispatch} = this.props;
            this.map.on("draw:created", function (e) {
                var object;
                if(e.layerType=="marker"){
                    object= L.marker(e.layer._latlng);
                }
                if(e.layerType=="polyline"){
                    object= L.polyline(e.layer._latlngs);
                }
                if(e.layerType=="polygon"){
                    object= L.polygon(e.layer._latlngs);
                }
                //var polygon = L.polygon(e.layer._latlngs);
                var geojson= object.toGeoJSON();
                var type = e.layerType,
                    layer = e.layer;

                if (type === 'marker') {
                    layer.bindPopup('A popup!');
                }
                var geoJson=geojson;
                var featype=e.layerType;
                const geoJsonvalue=geoJson.geometry;
                var guid=0;
                drawlayer.addLayer(layer);

            });

            this.map.on('draw:edited', function (e) {
                var layers = e.layers;
                layers.eachLayer(function (layer) {
                    editResult=layer;
                    var polygon=L.polygon(editResult._latlngs, {color: 'red'});
                    var geojson=editResult.toGeoJSON().geometry;
                    var featype=e.layerType;
                    var guid=editObject.feature.properties.guid;
                    dispatch(DrawAddMap(geojson,geojson.type,taskclassid,guid));
                    // editlayer.addLayer(polygon);
                    editlayer.clearLayers();
                    drawlayer.clearLayers();
                    editlatlngs=null;

                });
            });
            this.map.on('click', function (e) {
                // alert("尽量了");
                // L.DomEvent.stopPropagation(e);
            });
            drawlayer.on('click', function (e) {
                // var latlngs=e.layer.feature.geometry.coordinates[0];
                    editlayer.clearLayers();
                    editlayer.addLayer( L.polygon(e.layer._latlngs, {color: 'red'}));
            });
        }
        //图层控制
        geojsonmap() {
            if(jsonlayer!=null){
                jsonlayer.clearLayers();
            }
           var geojson=this.props.geojsonarr;
            if (geojson != null && geojson != "") {
                // var editlayer=new L.FeatureGroup();
                // this.map.addLayer(editlayer);
                jsonlayer= L.geoJSON(geojson, {
                    style: {
                        stroke:true,
                         color:'#59edca',
                         opacity: 1,
                         fillOpacity: 0.8,
                         fillColor: '#59edca',
                         weight:5
                    }
                }).bindPopup(function (layer) {

                    editObject=layer;
                    // var layeredit=new layer();
                    // return layer.feature.properties.description;
                    editlatlngs=layer._latlngs;
                    //L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(this.map);
                    this._map.setView(layer.getCenter(),14);
                    // this._map.setZoomAround(layer.getCenter(),14);
                    if(layer.feature.geometry.type=="Polygon"){
                        // editlayer.clearLayers();
                        editlayer.addLayer( L.polygon(layer._latlngs, {color: 'red'}));
                    }else{
                        var polyline = L.polyline(editlatlngs, {color: 'black'})
                    }


                }).addTo(this.map);
            }
        }

        render()
        {
            const geojsonarr=this.props.geojsonarr;
            if(geojsonarr=="SUCCESS"){
                const {dispatch} = this.props;
                dispatch(fetchTopmapgeojson(mapbandsvalue,taskclassid));
            }
            if(geojsonarr!=null && geojsonarr!="SUCCESS"){
                this.geojsonmap(geojsonarr);
            }
            if(editlatlngs!=null){
                editlayer.addLayer( L.polygon(editlatlngs, {color: 'red'}));
            }
            return (
                        <div className="map" ref={ref => this.mapDiv = ref} >
                        </div>
                    )
    }
}
export default MapComponent;
