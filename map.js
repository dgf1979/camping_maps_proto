var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  console.log("calcRoute");
  var start = "detroit, mi";
  var end = "portland, or";
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);

      var path = response.routes[0].overview_path;

      for (i = 0; i < path.length; i++) {
        addMarkerAt(path[i]);
      }
    }
  });
}

function addMarkerAt(latlong) {
  myLatlng = new google.maps.LatLng(latlong.A,latlong.F);

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

calcRoute();
