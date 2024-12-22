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
