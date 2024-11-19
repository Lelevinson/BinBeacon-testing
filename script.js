var map = L.map("map").setView([24.969748513353736, 121.26744248398677], 17);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// adding first marker
L.marker([24.969748513353736, 121.26744248398677], {
	opacity: 1,
	draggable: true,
	icon: L.icon({
		// this is for adding and styling icon
		iconUrl: "images/trash.png",
		iconSize: [20, 20],
		iconAnchor: [10, 20], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
		// long of anchor is same
		popupAnchor: [-3, -76],
	}),
	alt: "non-recyclable", // if the image fail to show up
}).addTo(map);

// adding second marker
L.marker([24.969338143170532, 121.26753221658362], {
	opacity: 1,
	draggable: true,
	icon: L.icon({
		// this is for adding and styling icon
		iconUrl: "images/recycle-bin.png",
		iconSize: [23, 23],
		iconAnchor: [10, 23], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
		// long of anchor is same
		popupAnchor: [-3, -76],
	}),
	alt: "recyclable", // if the image fail to show up
}).addTo(map);
