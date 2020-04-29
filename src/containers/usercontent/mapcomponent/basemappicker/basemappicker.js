import React, { Component } from 'react'
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import LayersIcon from '@material-ui/icons/Layers';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/**
 * L.TileLayer.ChinaProvider.providers = {
    TianDiTu: {
        Normal: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}"
        },
        Satellite: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
        },
        Terrain: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}"
        },
        Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    },

    GaoDe: {
        Normal: {
            Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        },
        Satellite: {
            Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains: ["1", "2", "3", "4"]
    },

    Google: {
        Normal: {
            Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Satellite: {
            Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Subdomains: []
    },

    Geoq: {
        Normal: {
            Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
            Color: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}",
            PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
            Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            Cold: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}"
        },
        Subdomains: []

    }
};

 */

const tileData = [
    {
      img: 'images/google.jpeg',
      title: '谷歌影像',
      author: 'author',
      cols: 1,
      checked: true,
      layers: [
        L.tileLayer('http://www.google.cn/maps/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
            maxZoom: 21,
            minZoom: 1,
            type: 'TILELAYER'
        }),
       L.tileLayer('https://mt1.google.cn/vt/imgtp=png32&lyrs=h&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Ga', {
            maxZoom: 21,
            minZoom: 1,
            type: 'TILELAYER'
        })
      ]
    },
    {
      img: 'images/googleearth.jpeg',
      title: '谷歌地图',
      author: 'author',
      cols: 1,
      checked: false,
      layers:[
        L.tileLayer('http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', {
            maxZoom: 21,
            minZoom: 1,
            type: 'TILELAYER'
        }),
      ]
    },
    {
      img: 'images/gaode.jpeg',
      title: '高德影像',
      author: 'author',
      cols: 1,
      checked: false,
      layers:[
        L.tileLayer('http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
          maxZoom: 21,
          minZoom: 1,
          type: 'TILELAYER'
        }),
        L.tileLayer('http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
          maxZoom: 21,
          minZoom: 1,
          type: 'TILELAYER'
        }),
      ]
    },
    {
      img: 'images/gaode.png',
      title: '高德地图',
      author: 'author',
      cols: 1,
      checked: false,
      layers:[
        L.tileLayer('http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
          maxZoom: 21,
          minZoom: 1,
          type: 'TILELAYER'
        }),
      ]
    },
 ];
 
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 320,
    height: 260,
  },
  listTile :{
    padding: 15,
    height: '100%',
    width:'100%'
  },
  titleBar: {
    background: 'rgba(255, 255, 255, 0.54)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class BaseMapPicker extends Component {

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      basemap: '谷歌影像',
    };

    this.handleChange.bind(this);
  }
  

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (item) => (event) => {
    const {map} = this.props;
    tileData.map(tile => {
        if (tile.title === item.title  ){
          tile.checked = true;
          map.eachLayer((baselayer) =>{
            if(baselayer && baselayer.options && baselayer.options.type && baselayer.options.type ==='TILELAYER')
            {
              baselayer.remove();
            }
          });
          tile.layers.map((baselayer)=>{
            baselayer.addTo(map);
          });
        }
        else{
          tile.checked = false;
        }
        return tile;
    });
    this.setState({basemap: item.title});
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Typography>
        <LayersIcon  onClick={this.handlePopoverOpen.bind(this)} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handlePopoverClose.bind(this)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <div className={classes.root}>
            <GridList cellHeight={120} className={classes.gridList}>
                {tileData.map(tile => (
                  <GridListTile key={tile.img} cols={tile.cols || 1}>
                    <img src={tile.img} className={classes.listTile}  alt={tile.title} />
                    <GridListTileBar
                      className={classes.titleBar}
                      actionIcon={
                        <FormControlLabel
                          value="end"
                          control={<Checkbox color="primary" checked={tile.checked} onChange={this.handleChange(tile)} />}
                          label={tile.title}
                          labelPlacement="end"
                        />
                      }
                    />
                  </GridListTile>
                ))}
            </GridList>
          </div>
        </Popover>
      </Typography>
    )
  }
}

export default withStyles(styles)(BaseMapPicker)