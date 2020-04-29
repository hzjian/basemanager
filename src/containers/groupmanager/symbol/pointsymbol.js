import React, {Component, Fragment} from 'react';

/**
 * 点符号
 */
class PointSymbol extends Component {

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

        const {fillColor, fillSize, borderColor, borderSize, url} = this.props;
        let comp = null;
        if (url && url.length>0) {
            comp = <img style={{width: fillSize, height: fillSize,marginLeft:'8px',}} src={url}/>;
        } else {
            const style = {
                marginLeft:'8px',
                width: fillSize,
                height: fillSize,
                backgroundColor: fillColor,
                borderRadius: fillSize / 2,
                borderColor: borderColor,
                borderWidth: borderSize,
                borderStyle: "solid"
            };
            comp = <div className="point-symbol" style={style}></div>;
        }

        return comp;
    }
}

PointSymbol.defaultProps = {
    fillSize: 25,
    fillColor: "",
    borderColor: "",
    borderSize: "",
    url: ""
};

export default PointSymbol;
