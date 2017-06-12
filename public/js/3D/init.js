
init();
animate();

function init() {
	scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFFFFFF, 0.0015);
	camera = new THREE.PerspectiveCamera(55, container.offsetWidth / container.offsetHeight, 0.1, 3000);
	camera.position.copy(cameraPositions);
	camera.rotation.set(-0.47710290662359933,0.534678803361967,0.25756073552844544);
//	camera.rotation.set(cameraRotations.x,cameraRotations.y,cameraRotations.z);
	
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	createLight();
	updateLightPosition();
	
	renderer = new THREE.WebGLRenderer({
//		alpha: true,
		antialias: true,
		preserveDrawingBuffer: true
	});
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	renderer.setClearColor(rendererColor);
//	renderer.setClearColor(0x000000);
	renderer.shadowMapEnabled = true;
	container.appendChild(renderer.domElement);
    canvas = document.getElementsByTagName('canvas')[0];
//	addStats();
	addOrbitControls();
	addEventListeners();
    createMirror();
}

function animate() {
	requestAnimationFrame(animate);
    if(wordGroup){
        rotateWords();
    }
    if(mirrorParams.mirror){
        mirrorParams.mirror.render();
    }
    
	render();
}

function render() {
	renderer.render(scene, camera);
}

function rotateWords() {
    wAngle += 0.003;
    wordGroup.rotation.y = wAngle;
}