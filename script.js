// var map = L.map("map").setView([24.969748513353736, 121.26744248398677], 17);
var bound1 = L.latLng(24.972762287952364, 121.25814465016538),
	bound2 = L.latLng(24.964661062164637, 121.27052218810468),
	bound = L.latLngBounds(bound1, bound2); // to set the bounds of the map to only NEILI.
// If user tries to go out of the bounds, it will bounce back

/*L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
 maxZoom: 19,
 attribution:
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map); */

// Making tile layers
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: "© OpenStreetMap",
});

var stadiaLight = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

var stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

// creating icon variable
var nonRecyclableIcon = L.icon({
	// this is for adding and styling icon
	iconUrl: "images/pin marker.png",
	iconSize: [20, 20],
	iconAnchor: [10, 20], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
	// long of anchor is same
	popupAnchor: [0, -20],
});
var recyclableIcon = L.icon({
	iconUrl: "images/marker recyclable full.png",
	iconSize: [23, 23],
	iconAnchor: [10, 23],
	popupAnchor: [0, -20],
});
var recyclableAndNonIcon = L.icon({
	iconUrl: "images/marker recyclable fusion.png",
	iconSize: [23, 23],
	iconAnchor: [10, 23],
	popupAnchor: [0, -20],
});

// creating picture variable for pop up
var nonReyclableImg =
	'<img src="images/pin marker.png" height="50px" width="50px"/>';
var ReyclableImg =
	'<img src="images/marker recyclable full.png" height="50px" width="50px"/>';
var RecAndNonImg =
	'<img src="images/marker recyclable fusion.png" height="50px" width="50px"/>';

// creating pop ups variable
var nonRecyclablePopUp = L.popup({
	maxWidth: 300, // this is default value, I added this just to be more consice
	maxHeight: 300, // not a default value, if content exceed height, it will be scrollable
	closeButton: true,
	content:
		"<center>THIS IS A NON RECYCLABLE BIN</center>" +
		"</br>" +
		"<center>" +
		nonReyclableImg +
		"</center>",
});
var RecyclablePopUp = L.popup({
	maxWidth: 300, // this is default value, I added this just to be more consice
	maxHeight: 300, // not a default value, if content exceed height, it will be scrollable
	closeButton: true, // default value
	content:
		"<center>THIS IS A RECYCLABLE BIN</center>" +
		"</br>" +
		"<center>" +
		ReyclableImg +
		"</center>",
});
var RecyclableAndNonPopUp = L.popup({
	maxWidth: 300, // this is default value, I added this just to be more consice
	maxHeight: 300, // not a default value, if content exceed height, it will be scrollable
	closeButton: true, // default value
	content:
		"<center>THESE ARE BOTH RECYCLABLE BIN AND NON RECYCLABLE BIN</center>" +
		"</br>" +
		"<center>" +
		RecAndNonImg +
		"</center>",
});

// adding Non rec marker
var firstNorMarkerCoor = L.latLng(24.969748513353736, 121.26744248398677);
var nBin1 = L.marker(firstNorMarkerCoor, {
	draggable: true,
	icon: nonRecyclableIcon,
	alt: "non-recyclable", // if the image fail to show up
	title: "first marker", // if hover cursor on marker, a browser tooltip will pop up
	riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
}).bindPopup(nonRecyclablePopUp);

var secondNorMarkerCoor = L.latLng(24.968711908956212, 121.26571957755871);
var nBin2 = L.marker(secondNorMarkerCoor, {
	draggable: true,
	icon: nonRecyclableIcon,
	alt: "non-recyclable", // if the image fail to show up
	title: "first marker", // if hover cursor on marker, a browser tooltip will pop up
	riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
}).bindPopup(nonRecyclablePopUp);

// adding Recy marker
var secondRecMarkerCoor = L.latLng(24.969338143170532, 121.26753221658362);
var rBin2 = L.marker(secondRecMarkerCoor, {
	draggable: true,
	icon: recyclableIcon,
	alt: "recyclable",
	riseOnHover: true,
}).bindPopup(RecyclablePopUp);

var thirdRecMarkerCoor = L.latLng(24.97225761804693, 121.26255197265557);
var rBin3 = L.marker(thirdRecMarkerCoor, { 
	draggable: true,
	icon: recyclableIcon,
	alt: "recyclable",
	riseOnHover: true,
}).bindPopup(RecyclablePopUp);


// adding Both rec and non marker
var firstTwoMarkerCoor = L.latLng(24.96899644820178, 121.26751655050582);
var tBin1 = L.marker(firstTwoMarkerCoor, {
	draggable: true,
	icon: recyclableAndNonIcon,
	alt: "non-recyclable", // if the image fail to show up
	title: "first marker", // if hover cursor on marker, a browser tooltip will pop up
	riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
}).bindPopup(RecyclableAndNonPopUp);

var secondTwoMarkerCoor = L.latLng(24.969527805870307, 121.26309820814498);
var tBin2 = L.marker(secondTwoMarkerCoor, {
	draggable: true,
	icon: recyclableAndNonIcon,
	alt: "non-recyclable", // if the image fail to show up
	title: "first marker", // if hover cursor on marker, a browser tooltip will pop up
	riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
}).bindPopup(RecyclableAndNonPopUp);

var thirdTwoMarkerCoor = L.latLng(24.969619858509844, 121.26388423170528);
var tBin3 = L.marker(thirdTwoMarkerCoor, {
	draggable: true,
	icon: recyclableAndNonIcon,
	alt: "non-recyclable", // if the image fail to show up
	title: "first marker", // if hover cursor on marker, a browser tooltip will pop up
	riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
}).bindPopup(RecyclableAndNonPopUp);


var recbins = L.layerGroup([rBin2, rBin3]);
var norbins = L.layerGroup([nBin1, nBin2]);
var twobins = L.layerGroup([tBin1, tBin2, tBin3]);

//map initiallization
var map = L.map("map", {
	center: [24.969748513353736, 121.26744248398677],
	zoom: 17,
	maxBounds: bound, // option to set bounds.
	layers: [osm, twobins],
});

var baseBins = {
	"Standard": osm,
	"Light": stadiaLight,
	"Dark": stadiaDark,
};

var overlayBins = {
	"Recycling bins": recbins,
	"Non-recycling bins": norbins,
	"Pair of both": twobins,
};

var layerControl = L.control.layers(baseBins, overlayBins).addTo(map);
