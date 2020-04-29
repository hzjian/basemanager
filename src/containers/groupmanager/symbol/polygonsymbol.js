import React, {Component, Fragment} from 'react';

/**
 * 面符号
 */
class PolygonSymbol extends Component {

    constructor() {
        super();
        this.state = {};
    }

    colorRGBtoHex(color) {
        var hex = '#000000';
        if(color && color.r && color.g && color.b )
        {
            var r = parseInt(color.r);
            var g = parseInt(color.g);
            var b = parseInt(color.b);
                hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        return hex;
     }
    render() {

        const {width, height, fillColor, borderColor, borderSize, borderDash} = this.props,
            style = {
                marginLeft:'8px',
                width: width,
                height: height,
                backgroundColor: fillColor,
                borderColor: borderColor,
                borderWidth: borderSize,
                borderStyle: borderDash === "0" ? "solid" : "dashed"
            };

        return (
            <div className="polygon-symbol" style={style}></div>
        );
    }
}

PolygonSymbol.defaultProps = {
    width: 25,
    height: 25,
    fillColor: "",
    borderColor: "",
    borderSize: "",
    borderDash: 0,
};

export default PolygonSymbol;
