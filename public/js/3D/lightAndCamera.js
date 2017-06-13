function resetCamera(positionZ) {
	camera.position.copy(cameraPositions);
//	camera.zoom = 3;
	camera.updateProjectionMatrix();
	updateLightPosition();
	light.position.y = 0;
	light.position.x = 0;
	resetControlsPotision();
}


let light1;
function createLight() {
	scene.add(new THREE.AmbientLight(0xffffff, 1.2));

	light = new THREE.SpotLight(0xffffff, .45);
	light.position.set(-250, 350, 150);
	light.castShadow = true;
	light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(70, 1, 200, 2000));
//	light.shadow.bias = -0.000222;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.shadowCameraVisible = true;
	light.shadowMapDarkness = 1;
	
	scene.add(light);
    
//    var intensity = 12.5;
//    var distance = 100;
//    var decay = 2.0;
////    var c1 = 0xff0040,
//    var c1 = 0xff0040,
//        c2 = 0x0040ff,
//        c3 = 0x80ff80,
//        c4 = 0xffaa00,
//        c5 = 0x00ffaa,
//        c6 = 0xff1100;
//    var sphere = new THREE.SphereGeometry(0.25, 16, 8);
//    light1 = new THREE.PointLight(c1, intensity, distance, decay);
//    light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
//        color: c1
//    })));
//    scene.add(light1);
}

//function animLight() {
//    light1.distance = 200;
//    light1.position.z += 100;
//    light1.position.y += 100;
//    light1.position.x = -400;
//    let lindex = 0;
//    let coef = 1;
//    var intq = setInterval(function () {
//        light1.position.x += 5 * coef;
//        
//        lindex++;
//        if (lindex == 150) {
//            light1.color.setHex(Math.random() * 0xffffff);
//            lindex = 0;
//            coef = -coef;
//        }
//    }, 20);
//}

function updateLightPosition(){
	light.position.copy(camera.position);	 
	light.position.x += 100;		
	light.position.y -= 100;
}

function resetControlsPotision() {
	devModules.controls.center.copy(controlsPositions);
}