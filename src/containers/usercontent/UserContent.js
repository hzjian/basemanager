import React, { Component } from 'react'
import { connect } from 'react-redux';
import MapComponent from './mapcomponent/MapComponent';
import "leaflet/dist/leaflet.css";
import "./UserContent.css";
import {
    fetchTopTasksIfNeeded
} from "../../actions/usertask";
import {
    invalidateMapsPage,
    selectMapsPage,
    fetchTopmapgeojsonIfNeeded, fetchTopmapgeojson
} from "./actions/MapAction";

class UserContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, page } = this.props;
        this.props.fetchTopTasksIfNeeded(0);
    }

    render() {
        const { geojson,drawdata } = this.props;

        return (
            <div className="mapcontent">
                <MapComponent  id="map" geojsonarr={geojson} drawdata={drawdata}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    contentData: state.contentData
}

export default connect(mapStateToProps,{fetchTopTasksIfNeeded})(UserContent);