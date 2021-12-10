import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toUserResolution } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import ImageWMS from 'ol/source/ImageWMS';
import Image from 'ol/layer/Image';
import ImageArcgisISRest from 'ol/source/ImageArcGISRest'


var format = 'image/png';

var imagery = new XYZ ({
  url: 'https://geoservices.big.go.id/rbi/rest/services/BASEMAP/Rupabumi_Indonesia/MapServer/tile/{z}/{y}/{x}'

})

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
     // source: new OSM()
     source: imagery
    })
  ],
  view: new View({
    center: fromLonLat([110.49626,-7.34230]),
    zoom:13
  })


});

 const wms_source = new ImageWMS({
   ratio: 1,
   url: 'http://localhost:8080/geoserver/salatiga/wms',
   params: {'FORMAT' : format,
            'VERSION':'1.1.1',
            "STYLES":'',
            "LAYERS":'salatiga:ADMINISTRASIDESA_AR_25K',
            "exeptions": 'application/vnd.orc.de_inimage',
 }
})


const adminLayes = new Image({
  source: wms_source,
  visible:false
})

const jalan_source = new ImageWMS({
  ratio:1,
  url: 'http://localhost:8080/geoserver/salatiga/wms',
  params: {'FORMAT' : format,
            'VERSION':'1.1.1',
            "STYLES":'',
            "LAYERS":'salatiga:JALAN_LN_25K',
            "exeptions": 'application/vnd.orc.de_inimage',
     }
})
const jalanLayers = new Image({
  source: jalan_source,
  visible:true

})

const pendidikan_source = new ImageWMS({
  ratio:1,
  url: 'http://localhost:8080/geoserver/salatiga/wms',
  params: {'FORMAT' : format,
            'VERSION':'1.1.1',
            "STYLES":'',
            "LAYERS":'salatiga:PENDIDIKAN_LN_25K',
            "exeptions": 'application/vnd.orc.de_inimage',
     }
})
const pendidikanLayer = new Image({
  source: pendidikan_source,
  visible: true

})
const perkiraan_cuaca = new ImageArcgisISRest({

  url: 'https://gis.bmkg.go.id/arcgis/rest/services/Analisis_curah_hujan'
})

const perkiraanLayer = new Image({
  source: perkiraan_cuaca,
  visible:true
})

map.addLayer(adminLayes)
map.addLayer(jalanLayers)
map.addLayer(pendidikanLayer)
//map.addLayer(perkiraanLayer)