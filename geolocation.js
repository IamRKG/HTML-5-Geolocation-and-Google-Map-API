var map, infoWindow, geocoder;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    geocoder = new google.maps.Geocoder;
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            var latlng = pos;

            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
						infoWindow.setPosition(pos);
						infoWindow.setContent(results[0].formatted_address);
						infoWindow.open(map);
						map.setCenter(pos);
                    } else {
                        console.log('No results found')
                    }
                }else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        },function () {
            handleLocationError(true);
        })
    }else{
        handleLocationError(false);
    }

    function handleLocationError(browserHasGeolocation) {
        if(browserHasGeolocation){
            console.log('The Geolocation service failed')
        }else{
            console.log('Your browser doesn\'t support geolocation.')
        }
    }
};