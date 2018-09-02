/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function displayRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function (response, status) {
        if (status == "OK") {
            directionsDisplay.setDirections(response);
        }
    });
   // alert(start);
//    alert(getLatLangFromAddress(start).lat());
    startDriving();
}

var numDeltas = 100;
var delay = 100; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;
var marker;
var position0,position1;
var marker;
    
function moveMarker() {
    position0 += deltaLat;
    position1 += deltaLng;
    var latlng = new google.maps.LatLng(position0, position1);
    marker.setPosition(latlng);
    if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
    }
}

function startDriving() {
    i = 0; 
    if(marker == null){
        
    }else
       marker.setVisible(false);
    
    marker = new google.maps.Marker({
        map: map
    });
     position0=destLatLng.lat(),position1 =destLatLng.lng();

    var image = {
        url: "https://image.flaticon.com/icons/png/512/55/55283.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    };
    marker.setIcon(image);
    marker.setPosition(srcLatLng);
    marker.setVisible(true);
    
    deltaLat = (srcLatLng.lat() - destLatLng.lat()) / numDeltas;
    deltaLng = (srcLatLng.lng() - destLatLng.lng()) / numDeltas;
    moveMarker();
}