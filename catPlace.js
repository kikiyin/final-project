var map;
var infowindow;
var latitude;
var longitude;

function initMap(){
    var getValue = function(varname) {// Get value from url 

        //URL
        var url = location.href;
         
        //取得問號之後的值
        var temp = url.split("?");
     
        //將值再度分開
        var vars = temp[1].split("&");
     
      for (i=0; i<vars.length; i++)
      {
          var parts = vars[i].split("=");
          if (parts[0] == varname)
          {
              value = parts[1];
              break;
          }
      }
      return value;
    }
  
    latitude = Number(getValue("lat"));
    longitude = Number(getValue("lng"));
    var pyrmont = {lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 17
    });

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 1000,
      types: ['convenience_store'],
      keyword: ['7-ELEVEN'],
    }, callback);
}
  
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}     
window.addEventListener("load", function() {
    document.getElementById('back_index').addEventListener("click", function(){
        window.location.href = "index.html" ;
    });
});
