import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';
import "leaflet-draw";

export const drawControl = (props) => {
    const drawnItems = new L.FeatureGroup();
    props.map.addLayer(drawnItems);
    var drawoptions = {
        position: 'topleft',
        draw: {
            polyline: {
                shapeOptions: {
                    color: 'red',
                    weight: 1
                }
            },
            polygon: false,
            circle: false, // Turns off this drawing tool
            rectangle: false,
            marker:false,
            circlemarker:false
        },
        edit: {
            featureGroup: drawnItems, //REQUIRED!!
            remove: false
        }
    };
  
    const drawControl = new L.Control.Draw(drawoptions);

    props.map.addControl(drawControl);

    props.map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
    });
};