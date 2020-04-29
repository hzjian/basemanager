import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapComponent from './mapcomponent/mapcomponent';
import "leaflet/dist/leaflet.css";
import "./container.css";
import {
    fetchToptasks
} from "./actions";
import {
    invalidateMapsPage,
    selectMapsPage,
    fetchTopmapgeojson
} from "./actions";

class UserContent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, page } = this.props;
        this.props.fetchToptasks(0);
    }

    render() {
        const { geojson,drawdata } = this.props;

        return (
            <div className="mapcontent">
                <MapComponent  id="map" geojsonarr={geojson} drawdata={drawdata}>
                </MapComponent>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    contentData: state.usercontent
});

export default connect(mapStateToProps,{fetchToptasks})(UserContent);