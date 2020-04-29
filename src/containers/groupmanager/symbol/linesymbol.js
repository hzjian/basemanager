import React, {Component, Fragment} from 'react';

/**
 * 线符号
 */
class LineSymbol extends Component {

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
        const {width, color, size, dash} = this.props,
            style = {
                marginLeft:'8px',
                width: width,
                height: size,
                borderColor: color,
                borderWidth: size / 2,
                borderStyle: dash === "0" ? "solid" : "dashed"
            };

        return (
            <div style={style}></div>
        );
    }
}

LineSymbol.defaultProps = {
    width: 120,
    size: "",
    dash: 0,
};

export default LineSymbol;
