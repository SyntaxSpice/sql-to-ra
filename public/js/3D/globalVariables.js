var scene, camera, renderer, light, font;
var raycaster, mouse;
var mousePos;

var devModules = {
	controls: false,
	stats: false
};

var controlsPositions = {
    x: 450,
    y: 240,
    z: 461
};
var cameraPositions = {
    x: 450,
    y: 240,
    z: 461
}

var container = document.getElementById('threeSpace');
var canvas;
var wAngle = 0;

let wordGroup;
let rendererColor = 0xffffff;