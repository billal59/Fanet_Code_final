/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var directionsDisplay;
var directionsService;
var srcLatLng,destLatLng;

function initMap() {
    map = new google.maps.Map(document.getElementById('geomap'), {
        zoom: 13
    });
    directionsService = new google.maps.DirectionsService();
    var rendererOptions = {
        map: map
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)


    var markerSrc = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    var markerDest = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    var address = 'Dhaka';
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        map.setCenter(results[0].geometry.location);
    });

    var inputSrc = document.getElementById('start');
    var autocompleteSrc = new google.maps.places.Autocomplete(inputSrc);
    autocompleteSrc.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocompleteSrc.bindTo('bounds', map);
    var infowindowSrc = document.getElementById('infoSrc-content');
    setAddListener(autocompleteSrc, markerSrc, infowindowSrc,0);

    var inputDest = document.getElementById('end');
    var autocompleteDest = new google.maps.places.Autocomplete(inputDest);
    autocompleteDest.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocompleteDest.bindTo('bounds', map);
    var infowindowDest = document.getElementById('infoDest-content');
    setAddListener(autocompleteDest, markerDest, infowindowDest,1);
}

function setAddListener(autocomplete, marker, infowindowContent,flag) {
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(infowindowContent);
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        if(flag==0)
            srcLatLng=place.geometry.location;
        else
            destLatLng=place.geometry.location;
            
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
