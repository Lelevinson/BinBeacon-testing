//	Classes of Bins
import { sendName } from "./script.js";
//import { updatebinstatusfunction } from "./script.js"

async function receiveName(e, marker) {
	var x = e.latlng.lat;
	var y = e.latlng.lng;
	var data = await sendName(x, y);
	console.log("dataadalah: ", data);
	//if(nama != null)
	var nama = data.name;
	var keadaan = data.stts;
	var tipe = data.bintype; // taro if disini
	//console.log(`the coords are${x}, ${y}, name ${nama}`)

	if(nama != null){
		marker
		.bindPopup(
			L.popup({
				maxWidth: 300,
				maxHeight: 300,
				closeButton: true,
			}).setContent(
				`<center>${nama} marker ${tipe}</center>
				<center>Status: ${keadaan}</center>` // add button in the future
			)
		)
		.openPopup();
	} else{
		marker
		.bindPopup(
			L.popup({
				maxWidth: 300,
				maxHeight: 300,
				closeButton: true,
			}).setContent(
				`<center>Status: ${keadaan}</center>` // add button in the future
			)
		)
		.openPopup();
	}
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
		}).on("click", (e) => receiveName(e, this.marker));
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
		}).on("click", (e) => receiveName(e, this.marker));
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
		}).on("click", (e) => receiveName(e, this.marker));
		//.addTo(map);
	}

	static recyclableAndNonIcon = L.icon({
		iconUrl: "/frontendstuff/images/twobinmarker.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26],
		popupAnchor: [0, -20],
	});
}
