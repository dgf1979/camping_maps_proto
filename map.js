var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var testCampsite1 = new google.maps.LatLng(37.50959, -109.654022);
var testCampsite2 = new google.maps.LatLng(40.742445, -113.002968);
var testCampsite3 = new google.maps.LatLng(29.047225, -81.509146);

var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(testCampsite1, testCampsite2);
var distanceInMiles = Math.round(distanceBetween * .000621371);


console.log(distanceInMiles);

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

      var stops = 2;
      var days = stops + 1;
      var stopAtEvery = Math.floor(path.length / days);

      for (i = 1; i <= stops; i++) {
        addMarkerAt(path[i * stopAtEvery]);
      }

      // for (i = 0; i < path.length; i++) {
      //   addMarkerAt(path[i]);
      // }
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
