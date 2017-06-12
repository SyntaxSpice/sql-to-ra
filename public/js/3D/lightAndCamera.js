function resetCamera(positionZ) {
	camera.position.copy(cameraPositions);
//	camera.zoom = 3;
	camera.updateProjectionMatrix();
	updateLightPosition();
	light.position.y = 0;
	light.position.x = 0;
	resetControlsPotision();
}

function createLight() {
	scene.add(new THREE.AmbientLight(0xf0f0f0, 1.2));

	light = new THREE.SpotLight(0xe6cda9, .45);
	light.position.set(-250, 350, 150);
	light.castShadow = true;
	light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
//	light.shadow.bias = -0.000222;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadowCameraVisible = true;
	light.shadowMapDarkness = 1;
	
	scene.add(light);
}

function updateLightPosition(){
	light.position.copy(camera.position);	 
	light.position.x += 100;		
	light.position.y -= 100;
}

function resetControlsPotision() {
	devModules.controls.center.copy(controlsPositions);
}