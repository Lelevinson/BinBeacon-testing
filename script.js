//	Classes of Bins
class RecBin {
	constructor(locationX, locationY, map) {
		this.locationX = locationX;
		this.locationY = locationY;

		this.marker = L.marker([this.locationX, this.locationY], {
			icon: RecBin.recyclableIcon,
			alt: "recyclable", // if the image fail to show up
			title: "click to see bin status", // if hover cursor on marker, a browser tooltip will pop up
			riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
		}).bindPopup(RecBin.recyclablePopUp);
	}

	static recyclableIcon = L.icon({
		// this is for adding and styling icon
		iconUrl: "images/marker recyclable.png",
		iconSize: [37, 37],
		iconAnchor: [18, 26], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
		// long of anchor is same
		popupAnchor: [0, -20],
	});

	static recyclableImg =
		'<img src="images/marker recyclable.png" height="50px" width="50px"/>';

	static recyclablePopUp = L.popup({
		maxWidth: 300, // this is default value, I added this just to be more consice
		maxHeight: 300, // not a default value, if content exceed height, it will be scrollable
		closeButton: true, // default value
	}).setContent(
		"<center>THIS IS A RECYCLABLE BIN</center>" +
			"</br>" +
			"<center>" +
			RecBin.recyclableImg +
			"</center>"
	);
}

class NorBin {
	constructor(locationX, locationY, map) {
		this.locationX = locationX;
		this.locationY = locationY;

		this.marker = L.marker([this.locationX, this.locationY], {
			icon: NorBin.nonRecyclableIcon,
			alt: "non-recyclable",
			title: "click to see bin status",
			riseOnHover: true,
		}).bindPopup(NorBin.nonRecyclablePopUp);
	}

	static nonRecyclableIcon = L.icon({
		iconUrl: "images/marker non-recyclable.png",
		iconSize: [37, 37],
		iconAnchor: [18, 26],
		popupAnchor: [0, -20],
	});

	//	creating picture variable for pop up
	static nonRecyclableImg =
		'<img src="images/marker non-recyclable.png" height="50px" width="50px"/>';

	static nonRecyclablePopUp = L.popup({
		maxWidth: 300,
		maxHeight: 300,
		closeButton: true,
	}).setContent(
		"<center>THIS IS A NON RECYCLABLE BIN</center>" +
			"</br>" +
			"<center>" +
			NorBin.nonRecyclableImg +
			"</center>"
	);
}

class TwoBin {
	constructor(locationX, locationY, map) {
		this.locationX = locationX;
		this.locationY = locationY;

		this.marker = L.marker([this.locationX, this.locationY], {
			icon: TwoBin.recyclableAndNonIcon,
			alt: "both non recyclable and recyclable",
			title: "click to see bin status",
			riseOnHover: true,
		}).bindPopup(TwoBin.recyclableAndNonPopUp);
	}

	static recyclableAndNonIcon = L.icon({
		iconUrl: "images/twobin marker.png",
		iconSize: [37, 37],
		iconAnchor: [18, 26],
		popupAnchor: [0, -20],
	});

	static recAndNonImg =
		'<img src="images/twobin marker.png" height="50px" width="50px"/>';

	static recyclableAndNonPopUp = L.popup({
		maxWidth: 300,
		maxHeight: 300,
		closeButton: true,
	}).setContent(
		"<center>THESE ARE BOTH RECYCLABLE BIN AND NON RECYCLABLE BIN</center>" +
			"</br>" +
			"<center>" +
			TwoBin.recAndNonImg +
			"</center>"
	);
}

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

//	manually adding markers to the map ( simpen semua data marker dalam list?)
var rBin1 = new RecBin(24.969338143170532, 121.26753221658362, map);
var rBin2 = new RecBin(24.97225761804693, 121.26255197265557, map);

var nBin1 = new NorBin(24.971326971645514, 121.26284968643745, map);
var nBin2 = new NorBin(24.968992734594863, 121.26273166933971, map);

var tBin1 = new TwoBin(24.96930883179381, 121.26314472955846, map);
var tBin2 = new TwoBin(24.968401873807974, 121.26756232771173, map);
var tBin3 = new TwoBin(24.969619858509844, 121.26388423170528, map);

//	layer groups
var recbins = L.layerGroup([rBin1.marker, rBin2.marker]);
var norbins = L.layerGroup([nBin1.marker, nBin2.marker]);
var twobins = L.layerGroup([tBin1.marker, tBin2.marker, tBin3.marker]);

//	map and user live location initiallization
var userMarker;
var map = L.map("map", {
	center: [24.969748513353736, 121.26744248398677],
	zoom: 18,
	maxBounds: bound, // option to set bounds.
	layers: [osm, recbins, norbins, twobins],
})
	.locate({
		watch: "true",
		enableHighAccuracy: "true",
		timeout: 10000 /* in milisecond */,
	}) // enabled user live location detection
	.on("locationfound", (e) => {
		if (!userMarker) {
			userMarker = new L.marker(e.latlng, {
				icon: L.icon({
					iconUrl: "images/beacon-svgrepo-com.svg",
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

// ------------------------------------------------------- OVERLAY BUTTON  -------------------------------------------------------

var resetZoomButton = document.querySelector("#zoom-button");
resetZoomButton.addEventListener("click", function () {
	map.setView([24.969748513353736, 121.26744248398677], 18);
});
