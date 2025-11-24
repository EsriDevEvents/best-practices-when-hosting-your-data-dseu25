import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BasemapStyle, VectorTileLayer } from "@esri/maplibre-arcgis";
import { 
  ARCGIS_APIKEY, 
  BUILDINGS_PAINT_PROPS, 
  DOCTORS_PAINT_PROPS, 
  KINDERGARDEN_PAINT_PROPS 
} from "./config.js";

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
  const buildingAndLandUseVector = 'https://vectortileservices7.arcgis.com/HNDmuVTswAHGmy4C/arcgis/rest/services/buildings_and_land_use/VectorTileServer';
  
  const vector = await VectorTileLayer.fromUrl(buildingAndLandUseVector, {
    token: ARCGIS_APIKEY
  });
  vector.addSourcesTo(map);
  
  let loadLayerStyles = function (layers, typeOfLayer, paintProps) {
    layers.forEach(element => {
      const layerProps = {
        ...vector.layer,
        id: element['id'],
        source: Object.keys(vector.style.sources)[0],
        'source-layer': element['source-layer'],
      };

      let layerStyleSpec = {
        ...layerProps,
        type: typeOfLayer,
        paint: paintProps
      }

      // Not display unclassified buildings
      if(typeOfLayer === 'fill-extrusion'){
        layerStyleSpec.filter = [
          'all',
          ['has', 'building_type'], // has the property
          ['!=', ['coalesce', ['get', 'building_type'], ''], ''] // and is not empty string
        ]
      }
      
      map.addLayer(layerStyleSpec);
      
    });
  };

  const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  function attachHover(layers, propertyName) {
    layers.forEach(layer => {
      const layerId = layer.id;

      map.on('mousemove', layerId, (e) => {
        if (!e.features || !e.features.length) return;

        const feature = e.features[0];
        const value = feature.properties[propertyName];

        popup
          .setLngLat(e.lngLat)
          .setHTML(`<strong>${propertyName}: ${value ?? '(no value)'}</strong>`)
          .addTo(map);
      });

      map.on('mouseleave', layerId, () => {
        popup.remove();
      });
    });
  }

  // --- your groups ---
  const buildingLayers = vector.style.layers.filter(l => l['source-layer'] == 'main.buildings');
  loadLayerStyles(buildingLayers, 'fill-extrusion', BUILDINGS_PAINT_PROPS);
  attachHover(buildingLayers, 'building_type');
  // attachHover(buildingLayers, 'height');

  const doctorLayers = vector.style.layers.filter(l => l['source-layer'] == 'main.doctors');
  loadLayerStyles(doctorLayers, 'circle', DOCTORS_PAINT_PROPS);
  attachHover(doctorLayers, 'healthcare_speciality');

  const kindergartenLayers = vector.style.layers.filter(l => l['source-layer'] == 'main.kindergarten');
  loadLayerStyles(kindergartenLayers, 'circle', KINDERGARDEN_PAINT_PROPS);
  attachHover(kindergartenLayers, 'min_age');

  // Map group name -> layer ids 
  const layerGroups = {
    buildings: buildingLayers.map(l => l.id),
    doctors: doctorLayers.map(l => l.id),
    kindergarten: kindergartenLayers.map(l => l.id)
  };

  function showGroup(groupName) {
    Object.entries(layerGroups).forEach(([name, ids]) => {
      const visibility = name === groupName ? 'visible' : 'none';
      ids.forEach(id => {
        if (map.getLayer(id)) {
          map.setLayoutProperty(id, 'visibility', visibility);
        }
      });
    });

    // clear popup when switching group
    popup.remove();
  }

  // Radio buttons
  document.querySelectorAll('input[name="layer-group"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      showGroup(e.target.value);
    });
  });

  // Initial state: show only buildings
  showGroup('buildings');
});




// Helper to get the camera position
// map.on('moveend', () => {
  //   const center = map.getCenter(); // returns a LngLat object
//   const zoom = map.getZoom();
//   const bearing = map.getBearing(); // rotation in degrees
//   const pitch = map.getPitch();     // tilt in degrees

//   console.log('📍 Camera settings:');
//   console.log(`center: [${center.lng.toFixed(5)}, ${center.lat.toFixed(5)}]`);
//   console.log(`zoom: ${zoom.toFixed(2)}`);
//   console.log(`bearing: ${bearing.toFixed(2)}`);
//   console.log(`pitch: ${pitch.toFixed(2)}`);
// });