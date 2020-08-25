var baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var place = [-48.996481, -28.466223]; // Tubarão - Brazil

var map = new ol.Map({
  target: 'map',
  layers: [baseMapLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat(place),
    zoom: 15
  })
});

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */({
    anchor: [0.5, 16],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'images/icon.png'
  }))
});

var marker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat(place)
  )
});

marker.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
  features: [marker]
});

var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});

map.addLayer(markerVectorLayer);

function updateCoordinate(item) {
  var featureToUpdate = marker;
  var coord = ol.proj.fromLonLat([item.Coordinate.Longitude, item.Coordinate.Latitude]);
  featureToUpdate.getGeometry().setCoordinates(coord);
}

const socket = io('ws://localhost:3000', { transports: ['websocket'] });

socket.on('locationUpdate', data => {
  const coordinates = JSON.parse(data);
  console.log('coordinates', coordinates);
  var coord = ol.proj.fromLonLat([coordinates.Coordinate.Longitude, coordinates.Coordinate.Latitude]);
  marker.getGeometry().setCoordinates(coord);
});