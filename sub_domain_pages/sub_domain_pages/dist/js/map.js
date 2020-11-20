'use strict';

function initMap() {

var map;


markers = isRtl ? markersArabic : markersEn

var pointerSun = '<svg class="map_pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.7 50.33"> <path class="pointer_bg" d="M16.35,0A16.35,16.35,0,0,1,32.7,16.35c0,9-16.35,34-16.35,34S0,25.38,0,16.35A16.35,16.35,0,0,1,16.35,0Z" fill="#fff"/> <path d="M3,16.43A13.79,13.79,0,1,1,16.78,30.21,13.78,13.78,0,0,1,3,16.43Z" fill="#297f90"/> <g> <path d="M17.34,13.65V11.88a.81.81,0,0,0-.81-.81.86.86,0,0,0-.8.81v1.77a.81.81,0,1,0,1.61,0Z" fill="#fff"/> <path d="M12.41,12.92a.88.88,0,0,0-1.21,0,.9.9,0,0,0,0,1.22l1.29,1.29a.89.89,0,0,0,.57.24.91.91,0,0,0,.57-.24.88.88,0,0,0,0-1.21Z" fill="#fff"/> <path d="M20.57,12.92l-1.29,1.3a.88.88,0,0,0,0,1.21.85.85,0,0,0,.57.24.86.86,0,0,0,.56-.24l1.29-1.29a.86.86,0,0,0,0-1.21C21.46,12.52,21,12.52,20.57,12.92Z" fill="#fff"/> <path d="M21.62,18.18a.88.88,0,0,0,.81.56.29.29,0,0,0,.24-.08l1.78-.56A1,1,0,0,0,25,17.05,1,1,0,0,0,24,16.48l-1.78.57a.87.87,0,0,0-.58,1.09Z" fill="#fff"/> <path d="M9.18,16.48a.84.84,0,0,0-1,.49.83.83,0,0,0,.49,1l1.69.57c.08,0,.16.08.33.08a1,1,0,0,0,.8-.56A.84.84,0,0,0,11,17.05Z" fill="#fff"/> <path d="M8.05,21.25a.9.9,0,0,0,1.13.48,11.7,11.7,0,0,1,4.61-.81,12.56,12.56,0,0,1,2.5.33c.57.16,1.29.24,2.1.4a19.1,19.1,0,0,0,3.07.24c1,0,1.94-.08,2.91-.16a.86.86,0,0,0-.24-1.7,20.26,20.26,0,0,1-5.5,0,12.89,12.89,0,0,1-2-.4,14.07,14.07,0,0,0-2.82-.4,11.83,11.83,0,0,0-5.25,1,.77.77,0,0,0-.49,1.05Z" fill="#fff"/> <path d="M11.93,19a8.53,8.53,0,0,1,2-.08,14.13,14.13,0,0,1,2.91.41c.56.16,1.21.24,1.93.4.89.08,1.78.16,2.67.16a5,5,0,0,0-4.12-4.76,4.76,4.76,0,0,0-3.71,1.05A5,5,0,0,0,11.93,19Z" fill="#fff"/> </g></svg>'
var pointerPlane = '<svg class="map_pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.7 50.33"> <path class="pointer_bg" d="M16.35,0A16.35,16.35,0,0,1,32.7,16.35c0,9-16.35,34-16.35,34S0,25.38,0,16.35A16.35,16.35,0,0,1,16.35,0Z" fill="#fff"/> <path d="M3,16.43A13.79,13.79,0,1,1,16.78,30.21,13.78,13.78,0,0,1,3,16.43Z" fill="#297f90"/> <path d="M11.71,19.51l-2.46.1a.41.41,0,0,0-.29.14l-.33.34,2.89,1.39,1.4,2.89.33-.33c.1-.1.1-.19.15-.29l.09-2.46,3.67-3.23L20.48,25l.87-.87a.94.94,0,0,0,.24-.62l-.72-8.72,4-4.82a.75.75,0,0,0,.19-.53l.05-.63a.86.86,0,0,0-.92-.91l-.63,0a1,1,0,0,0-.53.2l-4.81,4-8.73-.73a.73.73,0,0,0-.62.24L8,12.52l6.94,3.33Z" fill="#fff"/></svg>'
var pointerHotel = '<svg class="map_pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.7 50.33"> <path class="pointer_bg" d="M16.35,0A16.35,16.35,0,0,1,32.7,16.35c0,9-16.35,34-16.35,34S0,25.38,0,16.35A16.35,16.35,0,0,1,16.35,0Z" fill="#fff"/> <path d="M3,16.43A13.79,13.79,0,1,1,16.78,30.21,13.78,13.78,0,0,1,3,16.43Z" fill="#297f90"/> <path d="M19.42,11.68H17.17V10.31h2.25Zm0,3H17.17V13.29h2.25Zm0,3H17.17V16.27h2.25Zm-4.47-6H12.7V10.31H15Zm0,3H12.7V13.29H15Zm0,3H12.7V16.27H15ZM10.36,8a.36.36,0,0,0-.36.36h0v16.4a.36.36,0,0,0,.36.35h3.92V22.38a1.78,1.78,0,0,1,3.56,0v2.73h3.92a.36.36,0,0,0,.36-.35V8.36A.36.36,0,0,0,21.76,8Z" fill="#fff"/></svg>'

function pointerBuilder({id, type, active, title}) {
	var svg = type == 'beach' ? pointerSun : type == 'airport' ? pointerPlane : type == 'hotel' ? pointerHotel : ''
	var activeMod = active && (window.innerWidth > 1024) ? 'active_mod' : ''
	return `<div class="map_pointer_wrap ${activeMod}" data-id=${id}><div class="map_line"></div>${svg}</div>`
}

	var mapEl = document.getElementById("map");

	var isDraggable = window.innerWidth > 1024 ? false : true;

	var myOptions = {
		zoom: 11,
		center: {lat: 25.5, lng: 36.9},
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: false,
		// draggable: isDraggable,
		// scrollwheel: false,
		styles: [
			{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#f1efe8"
							}
					]
			},
			{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#beb996"
							}
					]
			},
			{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
							{
									"color": "#297f90"
							}
					]
			}
		]
	}

	function initMarkers(array, map) {
		var i;

    for (i = 0; i < array.length; i++) {  
			const marker = createHTMLMapMarker({
				latlng: new google.maps.LatLng(array[i].lat, array[i].lng),
				map: map,
				html: pointerBuilder(array[i])
			});
		}
	}


	if(mapEl !== null) {
		map = new google.maps.Map(mapEl,
		myOptions);
	
		initMarkers(markers, map, pointerSun)
	}

}
