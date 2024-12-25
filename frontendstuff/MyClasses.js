//	Classes of Bins

export class RecBin {
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
		iconUrl: "/images/marker recyclable.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26], // anchor when zooming in/out. lat of anchor is half of the icon size lat (it's horizontal).
		// long of anchor is same
		popupAnchor: [0, -20],
	});

	static recyclableImg =
		'<img src="/images/marker recyclable.png" height="50px" width="50px"/>';

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

export class NorBin {
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
		iconUrl: "/images/marker non-recyclable.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26],
		popupAnchor: [0, -20],
	});

	//	creating picture variable for pop up
	static nonRecyclableImg =
		'<img src="/images/marker non-recyclable.png" height="50px" width="50px"/>';

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

export class TwoBin {
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
		iconUrl: "/images/twobin marker.png",
		iconSize: [37, 37],
		iconAnchor: [19, 26],
		popupAnchor: [0, -20],
	});

	static recAndNonImg =
		'<img src="/images/twobin marker.png" height="50px" width="50px"/>';

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
