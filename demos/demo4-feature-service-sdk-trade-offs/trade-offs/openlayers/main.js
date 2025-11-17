// import 'ol';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';

import { apply } from 'ol-mapbox-style';
import { ARCGIS_APIKEY } from "./config.js";

const attribution = () => {
  const source = map.getLayers().item(0).getSource();
  const poweredByEsriString = "Powered by <a href='https://www.esri.com/en-us/home' target='_blank'>Esri</a> | ";
  
  const attributionFn = source.getAttributions();
  if (attributionFn) {
    source.setAttributions((ViewStateLayerStateExtent) => {
      return [poweredByEsriString, ...attributionFn(ViewStateLayerStateExtent)];
    });
  } else source.setAttributions(poweredByEsriString);
}

const map = new Map({
  target: 'map',
  view: new View({
    center: fromLonLat([8.62830, 50.09640]),
    zoom: 12,
  }),
});

const basemapId = "arcgis/topographic";
const basemapURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapId}?token=${ARCGIS_APIKEY}`;
apply(map, basemapURL).then(attribution);


apply(map, basemapURL).then(() => {

  const pointLayerURL =
    "https://services7.arcgis.com/HNDmuVTswAHGmy4C/arcgis/rest/services/buildings_and_land_use/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson&token="+ARCGIS_APIKEY;

  const pointSource = new VectorSource({
    format: new GeoJSON(),
    url: pointLayerURL,
  });

  const pointLayer = new VectorLayer({
    source: pointSource,
  });

  map.addLayer(pointLayer);

  });
