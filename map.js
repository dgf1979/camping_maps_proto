var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var testCampsite1 = new google.maps.LatLng(37.50959, -109.654022);
var testCampsite2 = new google.maps.LatLng(40.742445, -113.002968);
var testCampsite3 = new google.maps.LatLng(29.047225, -81.509146);

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
        console.log ("setting marker # " + i);

        console.log(distanceBetween(path[i * stopAtEvery], testCampsite1));

      }

      addTentMarkerAt(testCampsite1);
      addTentMarkerAt(testCampsite2);
      addTentMarkerAt(testCampsite3);

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

function addTentMarkerAt(latlong) {
  myLatlng = new google.maps.LatLng(latlong.A,latlong.F);
  var tentIcon = 'tent.png';
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: tentIcon
  });
}

function distanceBetween(pointA, pointB) {
  var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
  var distanceInMiles = Math.round(distanceBetween * .000621371);
  console.log("distance between " + pointA + " and " + pointB + " is " + distanceInMiles + " miles.");
  return distanceInMiles;
}

google.maps.event.addDomListener(window, 'load', initialize);

calcRoute();
