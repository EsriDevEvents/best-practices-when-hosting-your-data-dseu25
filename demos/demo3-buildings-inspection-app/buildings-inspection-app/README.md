# Demo steps

* Create a view layer for an operator to edit buildings:
  * Just main buildings
    * Filter -> Operator: Nora Holtfreter
    * Area ->  Edit in that area
    * Fields remove: id, amenity, operator, shapes
  * Define view: 
    * Building inspections by Nora
* Configure enable editing
  * Create a web map
  * Add sketch notes
  * Save web map
  * Create a dev credential: 
    * Privileges: 
      * Basemaps 
      * General > Features 
    * Item scope : Feature view & webmap
    * Title: Noras building inspection Key
* Place the api key in the code
  * Edit front to the station (Am Hauptbahnhof, 60329,)
    * type: YES -> Commercial
    * height -> 516
* See in webmap, recook vector tiles, show in vector showcase