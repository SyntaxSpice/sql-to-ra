

function createCubeGeom(obj) {
	let {width, height, depth, color=0xffffff} = obj;
//	let material = new THREE.MeshPhongMaterial({transparent: true, map: texture, specular: 0xffffff});
	let material = new THREE.MeshStandardMaterial({transparent: true, roughness: .63, color: color});
//	texture.needsUpdate = true;
	let geometry = new THREE.CubeGeometry(width, height, depth, 1, 1, 1);
	geometry.verticesNeedUpdate = true;
	let mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

function createLineGeom(obj) {
	let {from, to, color} = obj;
	
	from = from || {x:0,y:0,z:0};
	to = to || {x:1,y:0,z:0};
	
	let material = new THREE.LineBasicMaterial({color: color});
	let geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(from.x, from.y, from.z),
		new THREE.Vector3(to.x, to.y, to.z)
	);

	let line = new THREE.Line(geometry, material);
	return line;
}

function createText(text, color=0x212121, size=15, height=3) {
	let textGeo = new THREE.TextGeometry(text, {
		font: font,
		size: size,
		height: height
	});
	let textMaterial = new THREE.MeshStandardMaterial({
		color: color,
//        roughness: .63,
        metalness: .4
	});
	let newText = new THREE.Mesh(textGeo, textMaterial);
    newText.castShadow = true;
    
    textGeo.computeBoundingBox();
    newText.width = Math.abs(textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    newText.height = Math.abs(textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);
    
	return newText;
}

function loadFont(url) {
	var loader = new THREE.FontLoader(); 
	loader.load(url, function (newFont) {
		font = newFont;
        var event = new Event("fontLoaded");
        window.dispatchEvent(event);
	});
};

loadFont('../js/3D/font/BigNoodleTooOblique_Italic.json');

//Babalusa_Cut_Regular
//https://gero3.github.io/facetype.js/
//http://www.1001freefonts.com/sans-serif-fonts-7.php