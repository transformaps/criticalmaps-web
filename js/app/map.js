define( ["leaflet"], function ( L ) {

  var currentMarkers = [];

  var greenIcon = L.icon( {
    iconUrl: '/img/bike.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  } );

  var zoom = ( geoLatitude == 0 && geoLongitude == 0 ) ? 3 : 11;
  var map = L.map( 'map', { zoomControl: false } );

  map.setView( [geoLatitude, geoLongitude], zoom );

  L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  } ).addTo( map );

  new L.Control.Zoom( { position: 'bottomleft' } ).addTo( map );

  var public = {
    setNewLocations: function ( locationsModel ) {

      //remove old markers
      currentMarkers.forEach( function ( marker ) {
        map.removeLayer( marker )
      } );

      //add new markes
      locationsModel.forEach( function ( coordinate ) {
        var marker = L.marker( [coordinate.latitude, coordinate.longitude], {icon: greenIcon} ).addTo( map );
        currentMarkers.push( marker );

      } );
    }
  }

  return public;
} );