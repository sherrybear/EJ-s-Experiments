(function() {
  var frankogawa, geoJsonLayer, telegraph, url;

  frankogawa = [
    {
      lat: 37.8044,
      lng: -122.27123
    }, {
      lat: 37.80905,
      lng: -122.27079
    }, {
      lat: 37.8049,
      lng: -122.27247
    }
  ];

  telegraph = [
    {
      lat: 37.80857,
      lng: -122.27092
    }, {
      lat: 37.80905,
      lng: -122.27079
    }
  ];

  geoJsonLayer = new L.GeoJSON(data);

  url = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp';

  wax.tilejson(url, function(tilejson) {
    var map;
    map = new L.Map('mapbox', {
      zoomControl: false,
      scrollWheelZoom: false
    }).setView(new L.LatLng(37.80548, -122.27193), 17).addLayer(new wax.leaf.connector(tilejson)).addLayer(geojsonLayer);
    return map.on('click', onMapClick);
  }, function(e) {
    return $('body').append("You clicked the map at " + e.latlng + "<br />");
  });

  console.log("fo", frankogawa[1]);

}).call(this);
