import React, {Component} from "react";
import './Map.css';
import L from 'leaflet';
import 'leaflet-draw';
import  'leaflet-fullscreen';
import  'leaflet-measure';
import  'leaflet-bookmarks';
import 'leaflet-tilelayer-geojson';
import 'leaflet-layerjson';
import "leaflet/dist/leaflet.css"
import "leaflet-toolbar/dist/leaflet.toolbar.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-bookmarks/dist/leaflet.bookmarks.css"
import "leaflet-measure/dist/leaflet-measure.css"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import "leaflet.measurecontrol/docs/leaflet.measurecontrol.css"
import "bootstrap/dist/css/bootstrap.min.css"
import img from '../imgs/marker-icon.png';
import Titlewindows from "./titlewindows/Titlewindows";

class MapComponent extends Component {
    map = null;
    mapDiv = null;
    editlayer=null;
    componentDidMount()
    {
            const {stateProxy} = this.props;
            this.stateProxy = stateProxy;
            this.map = L.map(this.mapDiv, {
                doubleClickZoom: false,//不可以通过双击放大，因为双击的作用是添加矩形
                contextmenu: true,
                zoomControl:false,
                zoom:12,
                contextmenuItems: [{
                    text: 'Bookmark this position',
                    callback: function (evt) {
                        this.fire('bookmark:new', {
                            latlng: evt.latlng
                        });
                    }
                }]
            }).setView(new L.LatLng(24.291, 166.636), 3);
            L.control.zoom({ zoomInTitle: '放大', zoomOutTitle: '缩小', position: 'topright' }).addTo(this.map);
            // 全屏
            var fsControl = new L.control.fullscreen({ position: 'topright',title:'全屏'}).addTo(this.map);

            const  editlayer=new L.FeatureGroup();

            this.map.addLayer(editlayer);
            this._setBaseMap();
            // this.map._onResize();
            this.map.on('moveend', function (ev) {
                console.log(ev.target.getBounds());
            });
        }

        _setBaseMap()
        {
            //影像地图
            var ImgLayers= L.tileLayer('http://www.google.cn/maps/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
                maxZoom: 21,
                minZoom: 1,
                attribution: '&copy; <a href="http://www.tulibj.com">Gamma</a> tuli'
            }).addTo(this.map);
            //影像地图标注
            L.tileLayer('http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}&s=Ga', {
                maxZoom: 21,
                minZoom: 1,
                attribution: '&copy; <a href="http://www.tulibj.com">Gamma</a> tuli'
            }).addTo(this.map);

            //增加绘制图层
            const drawnItems = new L.FeatureGroup();
            this.map.addLayer(drawnItems);

            //标记图片
            var MyCustomMarker = L.Icon.extend({
                options: {
                    shadowUrl: null,
                    // iconAnchor: new L.Point(12, 12),
                    // iconSize: new L.Point(24, 24),
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
                        // allowIntersection: false, // Restricts shapes to simple polygons
                        shapeOptions: {
                            color: '#bada55'
                        }
                    }

                },
                edit: {
                    featureGroup: drawnItems, //REQUIRED!!
                    remove: false
                }
            };

            var drawControl = new L.Control.Draw(options);
            this.map.addControl(drawControl);

            this.map.on(L.Draw.Event.CREATED, function (e) {
                var type = e.layerType,
                    layer = e.layer;

                if (type === 'marker') {
                    layer.bindPopup('A popup!');
                }

                drawnItems.addLayer(layer);
            });
            var measureControl = new L.Control.Measure({
                localization: 'cn',
                position: 'topright',
                primaryLengthUnit: 'meters',
                secondaryLengthUnit: 'kilometers',
                primaryAreaUnit: 'sqmeters',
                secondaryAreaUnit: 'hectares',
                activeColor: '#ABE67E',
                completedColor: '#C8F2BE',
                className: 'leaflet-measure-resultpopup',
                autoPanPadding: [10, 10],
                captureZIndex: 10000
            });
            this.map.addControl(measureControl);
            this.map.on('click', function (e) {
                // alert("尽量了");
                // L.DomEvent.stopPropagation(e);
            });

            //书签
            var bookmarksControl = global.bookmarksControlLeft = new L.Control.Bookmarks({
                position: 'topright',
                onRemove: function (bookmark, callback) {
                    callback(true);  // will be removed
                },
            });
            this.map.addControl(bookmarksControl);
        }

        geojsonmap(geojson) {
            if (geojson != null && geojson != "") {
                var editlayer=new L.FeatureGroup();
                this.map.addLayer(editlayer);
                this.jsonlayer= L.geoJSON(geojson, {
                    style: {
                        stroke:true,
                         color:'#59edca',
                         opacity: 1,
                         fillOpacity: 0.8,
                         fillColor: '#59edca',
                         weight:5
                    }
                }).bindPopup(function (layer) {

                    // var layeredit=new layer();
                    // return layer.feature.properties.description;
                    var latlngs=layer.feature.geometry.coordinates[0];
                    //L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(this.map);

                    if(layer.feature.geometry.type=="Polygon"){
                        editlayer.clearLayers();
                        editlayer.addLayer( L.polygon(layer._latlngs, {color: 'red'}));
                    }else{
                        var polyline = L.polyline(latlngs, {color: 'black'})
                    }


                }).addTo(this.map);
            }
        }
        render()
        {
            const geojsonarr=this.props.geojsonarr;
            this.geojsonmap(geojsonarr);
            return <div className="mapinfo">
                <div className="map" ref={ref => this.mapDiv = ref} />
                <Titlewindows/>
            </div>

    }
}
// Map.propTypes = {
//     geojson: PropTypes.shape({
//         // login: PropTypes.string.isRequired,
//         // avatar_url: PropTypes.string.isRequired,
//         // url: PropTypes.string.isRequired,
//         // html_url: PropTypes.string.isRequired
//     }).isRequired
// };
export default MapComponent;
Map.defaultProps = {};
