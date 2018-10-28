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
        alert("Dhur " + e.message);
    }
    
    try{
      //  alert("srcLatLng length "+srcLatLng.length);
       // alert("destLatLng length "+destLatLng.length);
    }catch(e){
        alert("error "+e.message);
    }
    displayRoute('start', 'end', directionsService, directionsDisplay, marker1, srcLatLng[0], destLatLng[0],1);
    displayRoute('start1', 'end1', directionsService1, directionsDisplay1, marker2, srcLatLng[1], destLatLng[1],2);
    displayRoute('start2', 'end2', directionsService2, directionsDisplay2, marker3, srcLatLng[2], destLatLng[2],3);
    displayRoute('start3', 'end3', directionsService3, directionsDisplay3, marker4, srcLatLng[3], destLatLng[3],4);

}

function displayRoute(start, end, drcService, drcDisplay, marker, srcLatLngPost, destLatLngPost,instanceNo) {
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
    {   
      //  alert("srclatitude or destlatitude is null and instance no is "+instanceNo);
        return;
    }
    startDriving(marker, srcLatLngPost, destLatLngPost,instanceNo);
    // alert(start);
//    alert(getLatLangFromAddress(start).lat());
    //  startDriving();
}


function startDriving(marker, srcLatLngPost, destLatLngPost,instanceNo) {
    //i = 0;
    if (marker == null) {

    } else
        marker.setVisible(false);

    var position0 = destLatLngPost.lat(), position1 = destLatLngPost.lng();
    marker.setVisible(true);

    var deltaLat = (srcLatLngPost.lat() - destLatLngPost.lat()) / numDeltas;
    var deltaLng = (srcLatLngPost.lng() - destLatLngPost.lng()) / numDeltas;
    // moveMarker(marker, 0, position0, position1, deltaLat, deltaLng);
    getCommand(marker, 1, position0, position1, deltaLat, deltaLng, "10.11.201.170",instanceNo)
}

var numDeltas = 200;
var delay = 10; //milliseconds

function getCommand(marker, i, position0, position1, deltaLat, deltaLng, ipAddress,instanceNo) {
    try {
        var xmlhttp = callwebservice(position0, position1, ipAddress,instanceNo);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              //  alert(xmlhttp.responseText);
                var result = JSON.parse(xmlhttp.responseText);
                if (result.command == "run") {
                    position0 += deltaLat;
                    position1 += deltaLng;
                   // alert('command: '+result.command+' distance: '+result.distance);
                    console.log('command: '+result.command+' distance: '+result.distance+" instance "+result.instanceNo);
                    setTimeout(moveMarker,delay , marker, i, position0, position1, deltaLat, deltaLng, ipAddress,instanceNo);
                } else{
                    //alert('command: '+result.command+' distance: '+result.distance);
                    console.log('command: '+result.command+' distance: '+result.distance+" instance "+result.instanceNo);
                    setTimeout(getCommand, delay*5, marker, i, position0, position1, deltaLat, deltaLng, ipAddress,instanceNo);
                 }
            } else if (xmlhttp.status == 404) {
                alert("webapi not found");
            }
        }

        xmlhttp.onerror = function () {
            alert("error " + xmlhttp.responseText);
        }
    } catch (e) {
        alert("ok " + e.message);
    }
}

function moveMarker(marker, i, position0, position1, deltaLat, deltaLng, ipAddress,instanceNo) {
    var latlng = new google.maps.LatLng(position0, position1);
    marker.setPosition(latlng);
    if (i <= numDeltas) {
        i++;
        setTimeout(getCommand, delay, marker, i, position0, position1, deltaLat, deltaLng, ipAddress,instanceNo);
    }
}

function getMarker(srcLatLngForMarker) {
    var marker1 = new google.maps.Marker({
        map: map
    });

    var image = {
        url: "http://icons.iconarchive.com/icons/icons8/ios7/72/Transport-Airplane-Take-Off-icon.png",
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