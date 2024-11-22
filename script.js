var bound1 = L.latLng(24.972762287952364, 121.25814465016538),
	bound2 = L.latLng(24.964661062164637, 121.27052218810468),
	bound = L.latLngBounds(bound1, bound2); // to set the bounds of the map to only NEILI.
// If user tries to go out of the bounds, it will bounce back

var map = L.map("map", {
	center: [24.969748513353736, 121.26744248398677],
	zoom: 17,
	maxBounds: bound, // option to set bounds.
});

/*L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map); */

L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}",
	{
		minZoom: 17,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		ext: "png",
	}
).addTo(map);

// creating icon variable
var nonRecyclableIcon = L.icon({
	// this is for adding and styling icon
	iconUrl: "images/trash.png",
	iconSize: [20, 20],
	iconAnchor: [10, 20], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
	// long of anchor is same
	popupAnchor: [0, -20],
});
var recyclableIcon = L.icon({
	iconUrl: "images/recycle-bin.png",
	iconSize: [23, 23],
	iconAnchor: [10, 23],
	popupAnchor: [0, -20],
});

// creating picture var
var nonReyclableImg =
	'<img src="images/trash.png" height="50px" width="50px"/>';
var ReyclableImg =
	'<img src="images/recycle-bin.png" height="50px" width="50px"/>';

// creating pop up var
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

// creating geoJSON var for Recyclable and Non-Recyclable
var geojson_Recyclable = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			properties: {},
			geometry: {
				coordinates: [121.2674297605979, 24.96978337951427],
				type: "Point",
			},
		},
		{
			type: "Feature",
			properties: {},
			geometry: {
				coordinates: [121.26805649859023, 24.96750871556256],
				type: "Point",
			},
		},
	],
};

var geojson_NonRecyclable = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			properties: {},
			geometry: {
				coordinates: [121.26753586631207, 24.969182371314716],
				type: "Point",
			},
		},
		{
			type: "Feature",
			properties: {},
			geometry: {
				coordinates: [121.26621049477433, 24.969054169511196],
				type: "Point",
			},
		},
	],
};

// recyclable geoJSON
L.geoJSON(geojson_Recyclable, {
	pointToLayer: function (geoJsonPoint, latlng) {
		return L.marker(latlng, {
			draggable: true,
			icon: recyclableIcon,
			alt: "recyclable", // if the image fail to show up
			riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
		}).bindPopup(RecyclablePopUp);
	},
}).addTo(map);

// non-recyclable geoJSON
L.geoJSON(geojson_NonRecyclable, {
	pointToLayer: function (geoJsonPoint, latlng) {
		return L.marker(latlng, {
			draggable: true,
			icon: nonRecyclableIcon,
			alt: "non-recyclable", // if the image fail to show up
			riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
		}).bindPopup(nonRecyclablePopUp);
	},
}).addTo(map);
