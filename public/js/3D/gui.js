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
        for(let i = 0; i<title3DText.children.length; i++){
            let color = title3DText.children[i].material.color;
            color.setHex(val);
        }
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