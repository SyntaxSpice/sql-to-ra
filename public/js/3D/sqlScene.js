function createSqlScene() {
    let text1 = ["R", "a int", "b string", "c string"];
    let text2 = ["S", "c string", "d int"];

    let table1 = createTable(text1);
    let table2 = createTable(text2);

    table1.position.x -= 75;
    table2.position.x = -25;

    scene.add(table1, table2);
}

function createTable(text) {
    let table = new THREE.Group();
    table.position.z = -200;

    let cube = createCubeGeom({
        width: 20,
        height: 50,
        depth: 20
    });
    table.add(cube);

    for (let i = 0; i < text.length; i++) {
        let obj = createText(text[i], 0x212121, 3, 1);
        obj.position.y -= 5 * i - 20;
        obj.position.z = 10;
        obj.position.x = -7;
        table.add(obj);
    }

    table.scale.y = 2;
    table.scale.x = 2;
    return table;
}

let tree;

function createTree(objArr) {
    if(tree){
        removeTree(tree);
        tree = null;
    }
    
    
    let floors = [];
    tree = new THREE.Group();
    tree.scale.x = 2;
    tree.scale.y = 2;

    tree.position.x = 150;
    tree.position.z = -200
    scene.add(tree);;

    for (let i = 0; i < objArr.length; i++) {
        floors.push(createBoxByText(objArr[i]));
    }
    
    floors.sort(compareObjByProp('floor'));

    let floorHeight = 14;
    let floorPosX = 0;
    let y = 0;
    let floorIndex = 0;
    for (let i = 0; i < floors.length; i++) {
        if(floors[i].floor > floorIndex){
            floorIndex++;
        }
        y = floorHeight * floorIndex;
        
        floors[i].originalPos = y + floorHeight / 2;
        floors[i].position.y = container.offsetHeight / 3;
        floors[i].position.x = floorPosX;
        
        if(floors[i-1] && floors[i].floor == floors[i-1].floor){
            floors[i].position.x += floors[i].width+3;
            floorPosX += floors[i].width/2 + 1.5;
        }
        
        tree.add(floors[i]);
        
    }

    let index = 0;
    let inter = setInterval(function(){
        fallBox(floors[index]);
        index++;
        if(index>=floors.length){
            clearInterval(inter);
        }
    },250);
}

function fallBox(obj) {
    let step = 2;
    let inter = setInterval(function () {
        obj.position.y -= step;
        if (obj.position.y <= obj.originalPos) {
            obj.position.y = obj.originalPos;
            clearInterval(inter);
        }
    }, 10);
}

function removeTree(obj){
    let lim = container.offsetWidth / 2;
    let inter = setInterval(function(){
        obj.position.x += 4;
        if(obj.position.x > lim){
            scene.remove(obj);
            clearInterval(inter);           
        }
    },20);
}

function createBoxByText(val) {
    let text = createText(val.text, 0xffffff, 3, 1);
    text.position.z = 10;
    text.position.x -= text.width / 2;
    let width = text.width + 10;
//    let height = text.height + 10;
    let height = 14;

    let cube = createCubeGeom({
        width, height, depth: 20, color: 0x272727
    });

    let group = new THREE.Group();
    group.width = width;
    group.height = height;
    group.floor = val.index;

    group.add(text, cube);
    return group;
}