import L from "leaflet";
import {Component} from "react";
import {connect} from "react-redux";

class layerconfig extends Component {

     basemaps = {
        //影像地图
         ImgLayers: L.tileLayer('http://www.google.cn/maps/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
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

    groups = {
        // cities: new L.LayerGroup(),
        // restaurants: new L.LayerGroup(),
        // dogs: new L.LayerGroup(),
        // cats: new L.LayerGroup()
    };


    layerconfig = {
        LayerGroups: this.groups,
        Basemaps: this.basemaps
    };

}
export default connect()(layerconfig);