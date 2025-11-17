import "./style.css"
import "@arcgis/map-components/components/arcgis-map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const viewElement = document.querySelector("arcgis-map");

const featureLayer = new FeatureLayer({
  url: "https://services7.arcgis.com/HNDmuVTswAHGmy4C/arcgis/rest/services/buildings_and_land_use/FeatureServer/0"
});

// Wait for the internal MapView to be ready
await viewElement.viewOnReady();

viewElement.map.add(featureLayer);

// Wait for the layer to be ready for use.
await viewElement.whenLayerView(featureLayer);
await viewElement.goTo(featureLayer.fullExtent);

