/*Pixels (px):

    Use case: Fixed-size elements like borders, icons, or small areas that don't need to adjust to screen size.
    Why: px is an absolute unit, so it will always stay the same size regardless of screen size or zoom level.
    Example: font-size: 16px;

Relative Units (rem, em):

    rem (relative to the root element):
        Use case: For scaling typography or spacing consistently across a page.
        Why: rem is relative to the root <html> font size, so all sizes adjust proportionally. It’s easier to maintain a consistent design across various screen sizes.
        Example: If the root font size is 16px, 2rem equals 32px.
    em (relative to the parent element):
        Use case: Used mainly for font sizes or spacing that depends on the parent element’s size.
        Why: em scales based on the parent element, which can make components within larger containers grow/shrink accordingly.
        Example: font-size: 1.5em; will be 1.5 times the size of the parent element’s font size.

Viewport Units (vw, vh):

    Use case: Responsive layouts, especially for full-screen elements.
    Why: vw is based on the width of the viewport (browser window), and vh is based on its height. This is great for responsive design where elements need to scale according to the screen size.
    Example: width: 50vw; will make an element take up 50% of the viewport width.

Percentage (%):

    Use case: For flexible layouts where an element’s size needs to be relative to its parent container.
    Why: Percentages are fluid and adapt to the size of the parent element, which is useful in responsive designs.
    Example: width: 80%; makes the element take up 80% of its parent’s width.*/

html,
body {
	height: 100%;
	margin: 0;
}

#map {
	/*flexbox css for child(s) element*/
	display: flex;
	justify-content: flex-evenly;
	align-items: flex-end;
	/*to make the map full screen*/
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
	/*map will stay at most bottom layer*/
	z-index: 0;
	/*cursor: url("images/paw.svg"), auto;*/
}

.bottom-layer {
	position: fixed; /* Fixes the div to the viewport */
	display: flex;
	justify-content: center;

	padding: 0;
	bottom: 2%;
	left: 0;

	height: auto;
	width: 100%;

	z-index: 1000;
}

#button-overlay {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;

	height: 4%;
	width: 13%;

	margin: 0;
	padding-bottom: 1em;

	bottom: 0;
}

#name-button {
	display: flex;
	justify-content: center;
	align-items: center;

	min-height: 60%;
	min-width: 60%;

	margin: 0;
	padding: 5%;

	background-color: rgb(246, 246, 246);
	border-color: rgba(128, 128, 128, 0.3);
	border-radius: 5px;
}
/* same with name-button*/
#zoom-button {
	display: flex;
	justify-content: center;
	align-items: center;

	min-height: 60%;
	min-width: 60%;

	margin: 0;
	padding: 5%;

	background-color: rgb(246, 246, 246);
	border-color: rgba(128, 128, 128, 0.3);
	border-radius: 5px;
}

#button-text {
	margin: 0;
	padding: 0;

	font-size: 1em;
	text-align: center;
}
