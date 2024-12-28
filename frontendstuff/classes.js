//	Classes of Bins
import { sendName } from "./script.js"
//let something = "anjing";
var name;

async function receiveName(e, marker){ //harus bgt kah taro function ini di dalam marker objectnya?
	var x = e.latlng.lat;
	var y = e.latlng.lng;
	name = await sendName(x, y);

	console.log(`the coords are${x}, ${y}, name ${name}`) 

	marker
        .bindPopup(
            L.popup({
                maxWidth: 300,
                maxHeight: 300,
                closeButton: true,
            }).setContent(
                `<center>This was made by</center>
                <center>${name}</center>`
            )
        )
        .openPopup();
}

export class RecBin {
	constructor(locationX, locationY, map) {
		this.locationX = locationX;
		this.locationY = locationY;
 
		this.marker = L.marker([this.locationX, this.locationY], {
			icon: RecBin.recyclableIcon,
			alt: "recyclable", // if the image fail to show up
			title: "click to see bin status", // if hover cursor on marker, a browser tooltip will pop up
			riseOnHover: true, // if 2 or more trash bin coordinate is close, then the one cursor hover will be on top
		})
		.on('click', (e) => receiveName(e, this.marker)) 
		//.addTo(map);
	}

	static recyclableIcon = L.icon({
		// this is for adding and styling icon
		iconUrl: "/frontendstuff/images/recyclablemarker.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
		// long of anchor is same
		popupAnchor: [0, -20],
	});

	/*static recyclableImg =
		'<img src="/frontendstuff/images/recyclablemarker.png" height="50px" width="50px"/>';

		static recyclablePopUp = L.popup({
		maxWidth: 300, // this is default value, I added this just to be more consice
		maxHeight: 300, // not a default value, if content exceed height, it will be scrollable
		closeButton: true, // default value
	}).setContent(
		"<center>THIs was made by</center>" +
			//"</br>" +
			name + 
			"<center>" +
			//RecBin.recyclableImg +
			"</center>"
	);*/
}

export class NorBin {
	constructor(locationX, locationY, map) {
		this.locationX = locationX;
		this.locationY = locationY;

		this.marker = L.marker([this.locationX, this.locationY], {
			icon: NorBin.nonRecyclableIcon,
			alt: "non-recyclable",
			title: "click to see bin status",
			riseOnHover: true,
		})	
		.on('click', (e) => receiveName(e, this.marker)) 
		//.addTo(map);
	}

	static nonRecyclableIcon = L.icon({
		iconUrl: "/frontendstuff/images/nonrecyclablemarker.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26],
		popupAnchor: [0, -20],
	});
}

export class TwoBin {
	constructor(locationX, locationY, map) {
		this.locationX = locationX;
		this.locationY = locationY;

		this.marker = L.marker([this.locationX, this.locationY], {
			icon: TwoBin.recyclableAndNonIcon,
			alt: "both non recyclable and recyclable",
			title: "click to see bin status",
			riseOnHover: true,
		})		
		.on('click', (e) => receiveName(e, this.marker)) 
		//.addTo(map);
	}

	static recyclableAndNonIcon = L.icon({
		iconUrl: "/frontendstuff/images/twobinmarker.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26],
		popupAnchor: [0, -20],
	});
}