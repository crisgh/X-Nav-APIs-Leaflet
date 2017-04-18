	var mymap = L.map('mapid').setView([40.2838, -3.8215], 13);
 // Una vez creado el mapa con la localizacion del campus añadimos las capas..
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(mymap);

/* MAS SIMPLIFICADO-- menos datos en el mapa ...
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
*/

// Añadimos un popup para identificar nuestra posicion exacta( añadiendo las cordenadas manualmente)
	L.marker([40.2838, -3.8215]).addTo(mymap)
		.bindPopup("<b> Aulario III Popup</b><br /> coordenadas añadidas de foma manual.").openPopup();

	var popup = L.popup(); // vemos el popup en cuanto se carge la pagina

// Cuando hacemos click en cualquier parte del mapa se mostrara la geolocalizacion de ese punto
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Has hecho click sobre : " + e.latlng.toString())
			.openOn(mymap);
	}
	// activamos el funcionamiento cuando clickamos sobre el mapa
	mymap.on('click', onMapClick);

 // Pedimos la localizacion al navegador y se realiza la funcion para sacar el dato
	function onLocationFound(e) {
			var radius = e.accuracy /2 ; // nos indica la posicion

			L.marker(e.latlng).addTo(mymap) // creamos el marcador
				.bindPopup("Estas aproximadamente a " + radius + " metros de este punto").openPopup();

			L.circle(e.latlng, radius).addTo(mymap); // pintamos el circulo
		}
		// Si nos deniegan la localizacion
		mymap.on('locationfound', onLocationFound);
		function onLocationError(e) {
			alert(e.message);
		}
		mymap.on('locationerror', onLocationError);

		mymap.locate({setView: true, maxZoom: 16}); // agregamos el mapa
