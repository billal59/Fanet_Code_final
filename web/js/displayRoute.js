/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function displayRouteInMap() {

    try {
        var marker1 = getMarker(srcLatLng[0]),
                marker2 = getMarker(srcLatLng[1]),
                marker3 = getMarker(srcLatLng[2]),
                marker4 = getMarker(srcLatLng[3]);
    } catch (e) {
        alert("Dhur hala"+e.message);
    }
    displayRoute('start', 'end', directionsService, directionsDisplay, marker1, srcLatLng[0], destLatLng[0]);
    displayRoute('start1', 'end1', directionsService1, directionsDisplay1, marker2, srcLatLng[1], destLatLng[1]);
    displayRoute('start2', 'end2', directionsService2, directionsDisplay2, marker3, srcLatLng[2], destLatLng[2]);
    displayRoute('start3', 'end3', directionsService3, directionsDisplay3, marker4, srcLatLng[3], destLatLng[3]);

}

function displayRoute(start, end, drcService, drcDisplay, marker, srcLatLngPost, destLatLngPost) {
    var start = document.getElementById(start).value;
    var end = document.getElementById(end).value;
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    drcService.route(request, function (response, status) {
        if (status == "OK") {
            drcDisplay.setDirections(response);
        }
    });
    if (srcLatLngPost == null || destLatLngPost == null)
        return;
    startDriving(marker, srcLatLngPost, destLatLngPost);
    // alert(start);
//    alert(getLatLangFromAddress(start).lat());
    //  startDriving();
}


function startDriving(marker, srcLatLngPost, destLatLngPost) {
    //i = 0;
    if (marker == null) {

    } else
        marker.setVisible(false);

    var position0 = destLatLngPost.lat(), position1 = destLatLngPost.lng();
    marker.setVisible(true);

    var deltaLat = (srcLatLngPost.lat() - destLatLngPost.lat()) / numDeltas;
    var deltaLng = (srcLatLngPost.lng() - destLatLngPost.lng()) / numDeltas;
    moveMarker(marker,0,position0,position1,deltaLat,deltaLng);
}

var numDeltas = 100;
var delay = 100; //milliseconds

function getResponseFromAPI(){
    var json = JSON.stringify({operation: opName, username: "", usedlib: libName, isoconv: "1", samplenum: 1});

    var req = new XMLHttpRequest();
    req.open("POST", fpHTTSrvOpEP);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    req.onload = function () {
        if (req.status == 200) {
            return req.response;
        } else
            return null;
    };
    req.onerror = function () {
        alert("You have to install futronic sdk");
    };
    req.send(json);
}

function moveMarker(marker,i, position0, position1, deltaLat, deltaLng) {
    
    
    position0 += deltaLat;
    position1 += deltaLng;
    var latlng = new google.maps.LatLng(position0, position1);
    marker.setPosition(latlng);
    if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay, marker,i, position0, position1, deltaLat, deltaLng);
    }
}

function getMarker(srcLatLngForMarker) {
    var marker1 = new google.maps.Marker({
        map: map
    });

    var image = {
        url: "https://image.flaticon.com/icons/png/512/55/55283.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    };
    try {
        marker1.setIcon(image);
        marker1.setPosition(srcLatLngForMarker);
    } catch (e) {
        alert("ok error " + e.message);
    }
    return marker1;
}