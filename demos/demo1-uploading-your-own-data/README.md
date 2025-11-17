# Upload data

As a data analyst I have been assigned several tasks:

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [1. Make drone imagery (raster) available through a service](#1-make-drone-imagery-raster-available-through-a-service)
- [2. Make raw vector data through services](#2-make-raw-vector-data-through-services)
  - [Create geopackages](#create-geopackages)
- [3. Style de data](#3-style-de-data)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Make drone imagery (raster) available through a service

I'll do that by uploading a tile package (TPK): [SCBG_drone_image_DKies.tpk](./geoDataProviderGmbH/SCBG_drone_image_DKies.tpk)

<details>
<summary>Learn more</summary>

You can read the 📝 blog: [ArcGIS Hosted Data Services: Management Tools Differences > Tile package creation tools (TPK, TPKX & VTPK)](https://www.esri.com/arcgis-blog/products/developers/developers/arcgis-hosted-data-services-management-tools-differences#tile-package-creation-tools-tpk-tpkx-and-vtpk) to learn more about how to create tile packages

Find more tile packages (for testing) as public tile packages in arcgis.com:
* [TPK files](https://www.arcgis.com/home/search.html?restrict=false&sortField=relevance&sortOrder=desc&searchTerm=typekeywords%3A%22tpk%22)
* [TPKX files](https://www.arcgis.com/home/search.html?restrict=false&sortField=relevance&sortOrder=desc&searchTerm=typekeywords%3A%22tpkx%22)
* [VTPK files](https://www.arcgis.com/home/search.html?restrict=false&sortField=relevance&sortOrder=desc&searchTerm=typekeywords%3A"vtpk").

</details>

## 2. Make raw vector data through services

Create a feature service with a single layer from geojson

### Create geopackages

Create a feature service with multiple layers

<details>
<summary>Learn more</summary>

**Street furniture package**

```sh
ogr2ogr -f GPKG street_furniture.gpkg street_furniture/benches.geojson -nln benches
ogr2ogr -f GPKG -update street_furniture.gpkg street_furniture/fountain.geojson -nln fountain
ogr2ogr -f GPKG -update street_furniture.gpkg street_furniture/street_lamps.geojson -nln street_lamps
ogr2ogr -f GPKG -update street_furniture.gpkg street_furniture/waste.geojson -nln waste

ogrinfo street_furniture.gpkg
```

**Buildings and land use package**

```sh
ogr2ogr -f GPKG buildings_and_land_use.gpkg buildings_and_land_use/buildings.geojson -nln buildings
ogr2ogr -f GPKG -update buildings_and_land_use.gpkg buildings_and_land_use/doctors.geojson -nln doctors
ogr2ogr -f GPKG -update buildings_and_land_use.gpkg buildings_and_land_use/kindergarten.geojson -nln kindergarten

ogrinfo buildings_and_land_use.gpkg
```

**Transport and mobility**

```sh
ogr2ogr -f GPKG transport_and_mobility.gpkg transport_and_mobility/bicycle_parking_areas.geojson -nln bicycle_parking_areas
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/parking.geojson -nln parking
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/sidewalk.geojson -nln sidewalk
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/bus_stops.geojson -nln bus_stops
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/railway_platforms_lines.geojson -nln railway_platforms_lines
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/railway_platforms_polygons.geojson -nln railway_platforms_polygons
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/traffic_signals.geojson -nln traffic_signals
ogr2ogr -f GPKG -update transport_and_mobility.gpkg transport_and_mobility/crossing.geojson -nln crossing

ogrinfo transport_and_mobility.gpkg
```

</details>

## 3. Style de data