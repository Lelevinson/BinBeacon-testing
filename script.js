// var map = L.map("map").setView([24.969748513353736, 121.26744248398677], 17);
var bound1 = L.latLng(24.972762287952364, 121.25814465016538),
	bound2 = L.latLng(24.964661062164637, 121.27052218810468),
	bound = L.latLngBounds(bound1, bound2); // to set the bounds of the map to only NEILI. 
											// If user tries to go out of the bounds, it will bounce back

var map = L.map("map", {
	center: [24.969748513353736, 121.26744248398677],
	zoom: 17,
	maxBounds: bound, // option to set bounds.
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

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

// adding first marker
var firstMarkerCoor = L.latLng(24.969748513353736, 121.26744248398677);
L.marker(firstMarkerCoor, {
	draggable: true,
	icon: nonRecyclableIcon,
	alt: "non-recyclable", // if the image fail to show up
	title: "first marker", // if hover cursor on marker, a browser tooltip will pop up
	riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
})
	.addTo(map)
	.bindPopup("sup!");

L.marker([24.9697419835568, 121.26746903771664], {
	/* Dummy marker to show riseOnHover */ draggable: true,
	icon: L.icon({
		iconUrl: "images/trash-can.png",
		iconSize: [20, 20],
		iconAnchor: [10, 20],
		popupAnchor: [0, -20],
	}),
	alt: "non-recyclable",
	title: "first marker",
	riseOnHover: true,
})
	.addTo(map)
	.bindPopup("sup!");

// adding second marker
var secondMarkerCoor = L.latLng(24.969338143170532, 121.26753221658362);
L.marker(secondMarkerCoor, {
	draggable: true,
	icon: recyclableIcon,
	alt: "recyclable",
	riseOnHover: true,
}).addTo(map);
