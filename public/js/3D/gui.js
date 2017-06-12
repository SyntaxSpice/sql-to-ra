var gui, guiElements, param = {
    color: '0xffffff'
};

function clearGui() {
    if (gui) gui.destroy();
    gui = new dat.GUI();
    gui.open();
}

function buildGui() {
    clearGui();
    addGui('main text color', title3DText.children[0].material.color.getHex(), function (val) {
        for (let i = 0; i < title3DText.children.length; i++) {
            let color = title3DText.children[i].material.color;
            color.setHex(val);
        }
        render();
    }, true);
    addGui('speed', speed, function (val) {
        speed = val / 10;
        render();
    }, false, 0, 100);

    addGui('light color', light.color.getHex(), function (val) {
        light.color.setHex(val);
        render();
    }, true);
    addGui('intensity', light.intensity, function (val) {
        light.intensity = val;
        render();
    }, false, 0, 2);
    addGui('angle', light.angle, function (val) {
        light.angle = val;
        render();
    }, false, 0, Math.PI / 3);
    addGui('penumbra', light.penumbra, function (val) {
        light.penumbra = val;
        render();
    }, false, 0, 1);
    
    addGui('first falling color',ffc, function (val) {
        ffc = val;
        render();
    }, true);
    
    addGui('second falling color',sfc, function (val) {
        sfc = val;
        render();
    }, true);
    
    let mc = mirrorParams.mirror.material.uniforms.mirrorColor.value;
    addGui('mirror color', mc.getHex(), function (val) {
        mc.setHex(val);
        render();
    }, true);
    
    addGui('BG color', scene.fog.color.getHex(), function (val) {
        renderer.setClearColor(val);
        render();
    }, true);
    
    addGui('Fog color', rendererColor, function (val) {
        scene.fog.color.setHex(val);
        render();
    }, true);
    
    

}

function addGui(name, value, callback, isColor, min, max) {
    var node;
    param[name] = value;
    if (isColor) {
        node = gui.addColor(param, name).onChange(function () {
            callback(param[name]);
        });
    } else if (typeof value == 'object') {
        node = gui.add(param, name, value).onChange(function () {
            callback(param[name]);
        });
    } else {
        node = gui.add(param, name, min, max).onChange(function () {
            callback(param[name]);
        });
    }
    return node;
}

//buildGui();