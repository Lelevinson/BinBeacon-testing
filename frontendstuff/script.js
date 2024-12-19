import {RecBin, TwoBin, NorBin} from './MyClasses.js'

var bound1 = L.latLng(24.962957038371627, 121.27488024265767),
	bound2 = L.latLng(24.985034349532995, 121.2425501121096),
	bound = L.latLngBounds(bound1, bound2); // to set the bounds of the map to only NEILI.
// If user tries to go out of the bounds, it will bounce back

//	Selectable tile layers
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: "© OpenStreetMap",
});

var stadiaLight = L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}",
	{
		minZoom: 0,
		maxZoom: 20,
		//attribution:
		//'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		ext: "png",
	}
);

var stadiaDark = L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
	{
		minZoom: 0,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		ext: "png",
	}
);

//	map and user live location initiallization
var userMarker;
var userLatLng; // to record lat and lng value of user live location
var map = L.map("map", {
	center: [24.969748513353736, 121.26744248398677],
	zoom: 16,
	zoomControl: false, // remove + - button for zoom
	maxBounds: bound, // option to set bounds.
	layers: [osm],
})
	.locate({
		watch: "true",
		enableHighAccuracy: "true",
		timeout: 10000 /* in milisecond */,
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
			}).addTo(this.map);
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
async function fetchCoords(){
	try{
		const response = await fetch("https://binbeacon.onrender.com")

		if(!response.ok){
			throw new Error("Failed to get coords")
		}

		const data = await response.json();
		databaseArr = data;
		console.log(databaseArr);

	}
	catch(error){
		console.error(error)
	}
}
fetchCoords();

//	Making and adding markers to the map
async function sort() {
    await fetchCoords(); 
    console.log("done fetching from fetchCoords:", databaseArr[0].bintype);

    for(let i = 0; i < databaseArr.length; i++){	
		if(databaseArr[i].bintype === "Rec"){
			var rBin = new RecBin(databaseArr[i].corx, databaseArr[i].cory, map)
			recBinsArr.push(rBin.marker)
		}

		else if(databaseArr[i].bintype === "Two"){
			var tBin = new TwoBin(databaseArr[i].corx, databaseArr[i].cory, map)
			twoBinsArr.push(tBin.marker)
		}

		else{
			var nBin = new NorBin(databaseArr[i].corx, databaseArr[i].cory, map)
			norBinsArr.push(nBin.marker) 
		}
	} 
	
	console.log("result =", twoBinsArr)
	//	layer groups
	var recbins = L.layerGroup(recBinsArr);
	var norbins = L.layerGroup(norBinsArr);
	var twobins = L.layerGroup(twoBinsArr);

	twobins.addTo(map)

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
sort() 

// ------------------------------------------------------- OVERLAY BUTTON  -------------------------------------------------------

const buttons = document.querySelectorAll(".button-bar");
for (let i = 0; i < buttons.length; i++) {
	if (buttons[i].getAttribute("data-action") === "reset-zoom") {
		buttons[i].addEventListener("click", function () {
			map.setView([userLatLng.lat, userLatLng.lng], 18);
		});
	}
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	document.getElementById("mySidenav").style.height = "250px";
	document.getElementById("main").style.marginBottom = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	document.getElementById("mySidenav").style.height = "0";
	document.getElementById("main").style.marginBottom = "0";
}
