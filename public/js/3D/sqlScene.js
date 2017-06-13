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

function createTree(objArr) {
    let floors = [];
    let group = new THREE.Group();
    group.scale.x = 2;
    group.scale.y = 2;

    group.position.x = 150;
    group.position.z = -200
    scene.add(group);;

    for (let i = 0; i < objArr.length; i++) {
        floors.push(createBoxByText(objArr[i]));
    }

    let y = 0;
    for (let i = 0; i < floors.length; i++) {
        floors[i].originalPos = y + floors[i].height / 2;
        floors[i].position.y = container.offsetHeight / 3;
        group.add(floors[i]);
        y += floors[i].height;
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

function createBoxByText(val) {
    let text = createText(val, 0xffffff, 3, 1);
    text.position.z = 10;
    text.position.x -= text.width / 2;
    let width = text.width + 10;
    let height = text.height + 10;

    let cube = createCubeGeom({
        width, height, depth: 20, color: 0x272727
    });

    let group = new THREE.Group();
    group.width = width;
    group.height = height;

    group.add(text, cube);
    return group;
}