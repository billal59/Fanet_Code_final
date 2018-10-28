/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var directionsDisplay;
var directionsService;

var directionsDisplay1;
var directionsService1;

var directionsDisplay2;
var directionsService2;

var directionsDisplay3;
var directionsService3;
var srcLatLng, destLatLng;

function initMap() {
    map = new google.maps.Map(document.getElementById('geomap'), {
        zoom: 13
    });
    directionsService = new google.maps.DirectionsService();
    directionsService1 = new google.maps.DirectionsService();
    directionsService2 = new google.maps.DirectionsService();
    directionsService3 = new google.maps.DirectionsService();

    var rendererOptions = {map: map};
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay1 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay2 = new google.maps.DirectionsRenderer(rendererOptions);
    directionsDisplay3 = new google.maps.DirectionsRenderer(rendererOptions);


    var markerSrc = getMarker();
    var markerDest = getMarker();

    var markerSrc1 = getMarker();
    var markerDest1 = getMarker();

    var markerSrc2 = getMarker();
    var markerDest2 = getMarker();

    var markerSrc3 = getMarker();
    var markerDest3 = getMarker();

    var address = 'Dhaka';
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        map.setCenter(results[0].geometry.location);
    });

    srcLatLng = [];
    destLatLng = [];

    relateInputWithAutoComplete('start', markerSrc, 'infoSrc-content', 0);
    relateInputWithAutoComplete('end', markerDest, 'infoDest-content', 1);
    relateInputWithAutoComplete('start1', markerSrc1, 'infoSrc1-content', 2);
    relateInputWithAutoComplete('end1', markerDest1, 'infoDest1-content', 3);
    relateInputWithAutoComplete('start2', markerSrc2, 'infoSrc2-content', 4);
    relateInputWithAutoComplete('end2', markerDest2, 'infoDest2-content', 5);
    relateInputWithAutoComplete('start3', markerSrc3, 'infoSrc3-content', 6);
    relateInputWithAutoComplete('end3', markerDest3, 'infoDest3-content', 7);
}

function getMarker() {
    return  new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
}

function relateInputWithAutoComplete(inputIdName, markerSrc, infoWindowID, flag) {
    var inputSrc = document.getElementById(inputIdName);
    var autocompleteSrc = new google.maps.places.Autocomplete(inputSrc);
    autocompleteSrc.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocompleteSrc.bindTo('bounds', map);
    var infowindow = document.getElementById(infoWindowID);
    setAddListener(autocompleteSrc, markerSrc, infowindow, flag);
}

function setAddListener(autocomplete, marker, infowindowContent, flag) {
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(infowindowContent);
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        var flagNew = parseInt(flag/2);
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            if (flag % 2 == 0) {
                srcLatLng[flagNew] = null;
               // alert("flag error " + flag);
            } else {
                destLatLng[flagNew] = null;
              //  alert("flag error " + flag);
            }
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        // alert("hello1 "+place.geometry.location.lat());
        //  alert("hello2 "+place.geometry.location.lng());

        marker.setPosition(place.geometry.location);


        //alert("flag value " + flag + " and flagNew value is " + flagNew);
        if (flag % 2 == 0) {
            srcLatLng[flagNew] = place.geometry.location;
            //alert("srcLatLng length " + srcLatLng.length);
        } else {
            destLatLng[flagNew] = place.geometry.location;
           // alert("destLatLng length " + destLatLng.length);
        }
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });

}
