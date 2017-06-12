function onDocumentMouseDown(event) {
	event.preventDefault();

	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);

	findRaycasterPoint(event);
	findMousePositionOnScene();
	
}

function onDocumentMouseMove(event) {
	for (var func in mouseMoveFunctions) {
		mouseMoveFunctions[func](event);
	}

	updateLightPosition();
}

function onDocumentMouseUp(event) {
	 

	devModules.controls.noRotate = false;
	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
}

var mouseMoveFunctions = {
	init: (event) => {
		event.preventDefault();
		findRaycasterPoint(event);
	},
	findMousePositionOnScene: findMousePositionOnScene
};



function onWindowResize() {
	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	render();
}

