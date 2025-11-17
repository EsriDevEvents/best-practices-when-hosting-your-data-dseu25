import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BasemapStyle, VectorTileLayer } from "@esri/maplibre-arcgis";
import { ARCGIS_APIKEY, BUILDINGS_PAINT_PROPS } from "./config.js";

const map = new maplibregl.Map({
  container: 'map',
  center: [8.62830, 50.09640], // Frankfurt
  zoom: 13,
  bearing: 20,  
  pitch: 60,
  attributionControl: false
});

BasemapStyle.applyStyle(map, {
  style: 'arcgis/outdoor',
  token: ARCGIS_APIKEY
});

map.on('load', async () => {
  
  // Add service URL
  // E.g., https://vectortileservices3.arcgis.com/.../VectorTileServer
  const yourVectorLayer = '';
  
  const vector = await VectorTileLayer.fromUrl(yourVectorLayer, {
    token: ARCGIS_APIKEY
  });
  vector.addSourcesTo(map);
  
  // Retrieve each of the buildings styles (one per category)
  const layerStyles = vector.style.layers.filter(l => {
    return l['source-layer'] == 'main.buildings'
  });

  layerStyles.forEach(element => {
    console.log("element['id']=",element['id'])
    let layerStyleSpec = {
      ...vector.layer,
      'source-layer': 'main.buildings',
      source: Object.keys(vector.style.sources)[0],
      id: element['id'], // E.g., main.buildings/yes/1, ....
      type: 'fill-extrusion',
      paint: BUILDINGS_PAINT_PROPS,
      filter: [ // Hide unclassified buildings
        'all',
        ['has', 'building_type'], // has the property
        ['!=', ['coalesce', ['get', 'building_type'], ''], ''] // and is not empty string
      ]
    }
    map.addLayer(layerStyleSpec);
    
  });
  
});