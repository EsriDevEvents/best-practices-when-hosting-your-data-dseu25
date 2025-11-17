import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { featureLayer } from 'esri-leaflet';
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { ARCGIS_APIKEY } from "./config.js";

const token = ARCGIS_APIKEY
const map = L.map("map").setView([50.09640, 8.62830], 13);
vectorBasemapLayer("arcgis/topographic", { token }).addTo(map);

let buildings = featureLayer({
    url: "https://services7.arcgis.com/HNDmuVTswAHGmy4C/arcgis/rest/services/buildings_and_land_use/FeatureServer/0",
    token
  });

buildings.addTo(map);