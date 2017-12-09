
const univesitiesNewYorkLocation = {
  "New York University (NYU)": [{lat: 40.7291, lng: -73.9965},"50 West 4th Street, New York, NY 10012",[{lat: 40.742136, lng: -73.9907956}, {lat: 40.7253563, lng: -74.0108156}], "Greenwich Village, Manhattan"],
  "Columbia University" : [ {lat:40.807738, lng:-73.962540}, "535 W 116th St, New York, NY 10027",[{lat: 40.818091, lng: -73.9563131}, {lat: 40.80185549999999, lng: -73.9711901}] , "Morningside Heights, Manhattan"],
  "Fordham University" : [{lat:40.861927, lng: -73.885699}, "441 E Fordham Rd, Bronx, NY 10458",[{lat: 40.873478, lng: -73.8800049}, {lat: 40.8569791, lng: -73.9141048}], "Fordham Manor, Bronx"],
  "Julliard School" : [{lat:40.773677, lng: -73.982872}, "60 Lincoln Center Plaza, New York, NY 10023", [{lat: 40.781822, lng: -73.97608989999999}, {lat: 40.768483, lng: -73.9963789}], "Lincoln Square, Manhattan"],
  "St. John's University" : [{lat:40.721580, lng: -73.794690}, "8000 Utopia Pkwy, Jamaica, NY 11439", [{lat: 40.7322061, lng: -73.7898008}, {lat: 40.715319, lng: -73.808621}], "Hillcrest, Queens"],
  "Fashion Institute of Technology" : [{lat: 40.746911, lng:-73.994071}, "227 W 27th St, New York, NY 10001", [{lat: 40.7570384, lng: -73.9877916}, {lat: 40.7373582, lng: -74.0088629}], "Chelsea, Manhattan"],
  "Parsons School of Design" : [{lat: 40.735284, lng: -73.994593}, "66 5th Ave, New York, NY 10011", [{lat: 40.742136, lng: -73.9907956}, {lat: 40.7253563, lng: -74.0108156}], "Greenwich Village, Manhattan" ],
  "Pace University" : [{lat: 40.710941, lng: -74.004900}, "31-43 Spruce St, New York, NY 10038", [{lat: 40.7170449, lng: -73.9993878}, {lat: 40.7005852, lng: -74.0164805}], "Distrito Financiero, Manhattan"],
  "Baruch College" : [{lat: 40.739068, lng: -73.984650}, "135 E 22nd St, New York, NY 10010", [{lat: 40.74018510000001, lng: -73.9785298}, {lat: 40.7313276, lng: -73.98879459999999}], "Gramercy Park, Manhattan"],
  "The City College of New York" : [{lat: 40.820031, lng: -73.949262}, "160 Convent Ave New York, NY 10031", [{lat: 40.834443, lng: -73.9413373}, {lat: 40.81718, lng: -73.95876109999999}], "Hamilton Heights, Manhattan"],
  "Hunter College" : [{lat: 40.768492, lng: -73.964604}, "695 Park Ave New York, NY 10065", [{lat: 40.775726, lng: -73.949107}, {lat: 40.7586825, lng: -73.9732511}], "Lenox Hill, Manhattan"],
  "Pratt Institute" : [{lat: 40.691240, lng: -73.962569}, "209-225 Steuben St, Brooklyn, NY 11205", [{lat: 40.6979329, lng: -73.95785099999999}, {lat: 40.679558, lng: -73.971446}],"Clinton Hill, Brooklyn" ],
  "John Jay College of Criminal Justice" : [{lat: 40.770369, lng: -73.988489}, "899 10th Ave, New York, NY 10019", [{lat: 40.773677, lng: -73.9824487}, {lat: 40.752223, lng: -74.00473989999999}], "Hell's Kitchen, Manhattan"],
  "Borough of Manhattan Community College" : [{lat: 40.718772, lng: -74.011856}, "199 Chambers St, New York, NY 10007", [{lat: 40.7259498, lng: -74.0018893}, {lat: 40.7113379, lng: -74.0137633}], "TriBeCa, Manhattan"],
  "The New School" : [{lat: 40.735477, lng:-73.997128}, "Johnson Hall, 66 W 12th St, New York, NY 10011", [{lat: 40.742136, lng: -73.9907956}, {lat: 40.7253563, lng: -74.0108156}], "Greenwich Village, Manhattan" ],
  "LaGuardia Community College" : [{lat: 40.743823, lng: -73.934673}, "31-10 Thomson Ave, Long Island City, NY 11101", [{lat: 40.7630563, lng: -73.9094829}, {lat: 40.727849, lng: -73.9628577}], "Long Island City, Queens"],
  "New York Film Academy" : [{lat: 40.705096, lng: -74.015816}, "17 Battery Pl, New York, NY 10004", [{lat: 40.7170449, lng: -73.9993878}, {lat: 40.7005852, lng: -74.0164805}], "Distrito Financiero, Manhattan"],
  "New York City College of Technology" : [{lat: 40.695526, lng: -73.987448}, "300 Jay St, Brooklyn, NY 11201", [{lat: 40.7014311, lng: -73.9785862}, {lat: 40.686561, lng: -73.9923834}], "Downtown Brooklyn, Brooklyn"]
}

// -------------------Google Maps Section ------------------------
var map, initialLocation, mapInitialSetup, currentPosition, currentMarker, currentSchool;
const  normalZoom = 17;
function onGoogleMapResponse(){
    initialLocation = {lat: 40.7291, lng: -73.9965};
    currentPosition = initialLocation;
    mapInitialSetup = {center: initialLocation, zoom: normalZoom}
    currentSchool = "New York University (NYU)";
    map = new google.maps.Map(document.getElementById("mapContainer"), mapInitialSetup);

    currentMarker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: currentSchool
    });
    setCurrentlyAt(currentSchool);
    aproximateHoodOutline();
}

function setCurrentMarker(location, name){    //Puts marker on new position
  currentMarker.setMap(null);
  currentMarker = new google.maps.Marker({
    position: location,
    map: map,
    title: name
  });
}

function relocateMapCenter(){   //Sets map on the location of the chosen school
  currentSchool = $(this).html();
  currentPosition = univesitiesNewYorkLocation[currentSchool][0];
  map.setCenter(currentPosition);
  map.setZoom(normalZoom);
  setCurrentMarker(currentPosition, currentSchool);
  setCurrentlyAt(currentSchool);
  aproximateHoodOutline();
}
// ---------------------Currently at Section ------------------------

function setCurrentlyAt(name){    //Changes the info panel with current address, neighborhood and burough
  var address = univesitiesNewYorkLocation[name];
  $("#currentlyAtPanel").html(address[1] + "<br>" + address[3] );
}

// --------------------- Neighborhood ----------------------------

var hood; // It stores the rectangle that shows aproximately hood boundaries
var currentHoodBounds;  //It stores object Lan.lng.bounds that tells dimensions and location of hood

function aproximateHoodOutline(){   //Paints hood boundaries
  var hoodOutline = univesitiesNewYorkLocation[currentSchool][2];
  currentHoodBounds = new google.maps.LatLngBounds(hoodOutline[1], hoodOutline[0]);
  hood = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    map: map,
    bounds:currentHoodBounds
  });
  hood.setVisible(false);
}

function toggleHoodFunction(){    //It turns on and off hood boundaries
  if(hood.getVisible()){
    hood.setVisible(false);
    map.setCenter(currentPosition);
    map.setZoom(normalZoom);
  }else{
    hood.setVisible(true);
    map.fitBounds(currentHoodBounds);
  }
}


//--------------------- General Document -------------------------
$(document).ready(function(){
  //$("#getAddressBtn").on("click", getAddress);
  //$("#getClimateDataButton").on("click", getDailySummary);
  //$("#getArtGalleriesButton").on("click", getArtGalleries);
  //$("#getNeighborhoodDataButton").on("click", drawNeighborhood);
  //$("#checkNeighborhoodDataButton").on("click", checkNeighborhood);
  $(".selectSchool").on("click", relocateMapCenter);
  $("#toggleHood").on("click", toggleHoodFunction)
});