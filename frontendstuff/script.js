import { RecBin, TwoBin, NorBin } from "./MyClasses.js";

var bound1 = L.latLng(24.962957038371627, 121.27488024265767),
	bound2 = L.latLng(24.985034349532995, 121.2425501121096),
	bound = L.latLngBounds(bound1, bound2); // to set the bounds of the map to only NEILI.
// If user tries to go out of the bounds, it will bounce back

//	Selectable tile layers
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: "© OpenStreetMap",
});

var stadiapi;
async function fetchAPI(){
	try{
		//const response = await fetch('http://localhost:5500/configsta') // jadi karena port itu 5500 dia malah ke config situ, bukan ke port 3000. `${backendBaseURL}/config`
		const response = await fetch('https://binbeacon.onrender.com/configsta')
		const data = await response.json();
		//backendURL = data.port;
		stadiapi = data
	} catch(error){
    console.error('Error fetching configuration:', error);
	}
}
fetchAPI();
 

//	map and user live location initiallization
var userMarker;
var userLatLng; // to record lat and lng value of user live location
var map = L.map("map", {
	center: [24.97002566166282, 121.26446449672198], // mnurut gw mendingan sini. ori 24.969748513353736, 121.26744248398677
	zoom: 16,
	zoomControl: false, // remove + - button for zoom
	maxBounds: bound, // option to set bounds.
	layers: [osm],
})
	.locate({
		watch: "true",
		enableHighAccuracy: "true",
		// timeout: 120000 /* in milisecond */,
	}) // enabled user live location detection
	.on("locationfound", (e) => {
		userLatLng = e.latlng; // e is an object created when "locationfound" event is triggered, and contains informations about locationEvent like latlng
		if (!userMarker) {
			userMarker = new L.marker(e.latlng, {
				icon: L.icon({
					iconUrl: "/frontendstuff/images/beacon-svgrepo-com.svg",
					iconSize: [37, 37],
				}),
				alt: "user marker",
				title: "you are here!",
				riseOnHover: true,
			}).addTo(map);
		} else {
			userMarker.setLatLng(e.latlng);
		}
	})
	.on("locationerror", (error) => {
		if (userMarker) {
			map.removeLayer(userMarker);
			userMarker = undefined;
		}
	});

//	bin array logic implementation
var recBinsArr = [];
var norBinsArr = [];
var twoBinsArr = [];
let databaseArr = [];

//	Fetching data from the server
async function fetchCoords() {
	try {
		//const response = await fetch('http://localhost:5500/ambil-marker');
		const response = await fetch('https://binbeacon.onrender.com/ambil-marker');

		if (!response.ok) {
			throw new Error("Failed to get coords");
		}

		const data = await response.json();
		databaseArr = data;
		console.log(databaseArr);
	} catch (error) {
		console.error(error);
	}
}
fetchCoords();

//	Making and adding markers to the map
async function sort() {
	await fetchCoords();
	await fetchAPI();
	console.log("done fetching from fetchCoords:", databaseArr[0].bintype);

	for (let i = 0; i < databaseArr.length; i++) {
		if (databaseArr[i].bintype === "Rec") {
			var rBin = new RecBin(databaseArr[i].corx, databaseArr[i].cory, map);
			recBinsArr.push(rBin.marker);
		} else if (databaseArr[i].bintype === "Two") {
			var tBin = new TwoBin(databaseArr[i].corx, databaseArr[i].cory, map);
			twoBinsArr.push(tBin.marker);
		} else {
			var nBin = new NorBin(databaseArr[i].corx, databaseArr[i].cory, map);
			norBinsArr.push(nBin.marker);
		}
	}

	console.log("result =", twoBinsArr);
	//	layer groups
	var recbins = L.layerGroup(recBinsArr);
	var norbins = L.layerGroup(norBinsArr);
	var twobins = L.layerGroup(twoBinsArr);

	twobins.addTo(map);

	var stadiaLight = L.tileLayer(
		`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}?api_key=${stadiapi}`,
		{
			minZoom: 0,
			maxZoom: 20,
			ext: "png", //removed attributions
		}
	);
	
	var stadiaDark = L.tileLayer(
		`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}?api_key=${stadiapi}`,
		{
			minZoom: 0,
			maxZoom: 20,
			ext: "png", //removed attributions
		}
	);

	var baseBins = {
		Standard: osm,
		Light: stadiaLight,
		Dark: stadiaDark,
	};

	var overlayBins = {
		"Recycling bins": recbins,
		"Non-recycling bins": norbins,
		"Pair of both": twobins,
	};

	var layerControl = L.control.layers(baseBins, overlayBins).addTo(map);
}
sort();

async function sendMarkersTDB()
{
	//e.preventDefault()
	const dsata = {
		corx: '24.972557134111153',  
		cory: '121.26728431015152', // tinggal implement user location
		type: 'Nor',
		name: null || 'john code'
	}

	//const res = await fetch('http://localhost:5500/tambah-marker-user',
	const res = await fetch('https://binbeacon.onrender.com/ambil-marker/tambah-marker-user',
	{
		method: 'POST',
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(dsata)

	}).then(response => response.json()) 
	.then(data => console.log('Success:', data))
	.catch(error => console.error('Error:', error));
}
sendMarkersTDB();

// ------------------------------------------------------- OVERLAY BUTTON  -------------------------------------------------------
const buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
	if (buttons[i].getAttribute("data-action") === "reset-zoom") {
		buttons[i].addEventListener("click", function () {
			map.setView([userLatLng.lat, userLatLng.lng], 18);
		});
	}
}
