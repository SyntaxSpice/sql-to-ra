let word;
wordGroup = new THREE.Group();
//setTimeout(function () {
//    createWords();
//    scene.add(wordGroup);
//}, 1000);


function createWords() {
    let circle = new THREE.CircleGeometry(600, 50);
    let geom = circle.vertices;
    let index = 0;

    for (let i = 1; i < geom.length; i++) {
        let obj = createText(keywords[i], 0x000000);
        //        obj.rotation.y = -Math.PI / 180 * i;

        //         obj.position.x = 20*Math.cos(i*10) + 0;
        //        obj.position.z = 20*Math.sin(i*10) + 0;
        index++;
        if (index % 2 == 0) obj.position.y += 170;
        if (index % 3 == 0) {
            obj.position.y -= 170;
            index = 0;
        }
        obj.position.x = geom[i].x;
        obj.position.z = geom[i].y;

        wordGroup.add(obj);
    }
}

let ra3dWords = [];
let raGroup;

function createRAStr() {
    if (raGroup) {
        scene.remove(raGroup);
    }
    raGroup = new THREE.Group();
    ra3dWords = [];
    let strArr = str.split(" ");

    let halfWidth = container.offsetWidth / 2 + 100;
    let strWidth = 0;
    let objPos;


    for (let i = 0; i < strArr.length; i++) {
        let obj = createText(strArr[i], 0x000000);
        obj.geometry.computeBoundingBox();
        obj.width = obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x;
        strWidth += obj.width;

        obj.position.x = i < strArr.length * 2 ? -halfWidth : halfWidth;
        obj.position.y = 200;
        raGroup.add(obj);
        ra3dWords.push(obj);
    }

    objPos = -strWidth / 2;

    for (let i = 0; i < ra3dWords.length; i++) {
        let obj = ra3dWords[i];
        obj.strPosition = objPos;
        objPos += obj.width + 10;
    }

    scene.add(raGroup);
    animateRAStr();
    
}

function animateRAStr() {
    let index = 0;

    let inter = setInterval(function () {

        animateWord(ra3dWords[index]);
        index++;
        if (index > ra3dWords.length - 1) {
            clearInterval(inter);
        }

    }, 200);
}

function animateWord(obj) {
    let length = Math.abs(obj.position.x - obj.strPosition);
    let yStep = 2;
    let inter = setInterval(function () {
        obj.position.x += length / 100;
        obj.position.y -= yStep;
        obj.position.z += 1;
        if (obj.position.x > obj.strPosition) {
            clearInterval(inter);
            obj.position.x = obj.strPosition;
        }
    }, 10);
}



var str = "pi a,b,c from R where a<150";


var keywords = [
    'pi', 'sigma', 'rho', 'tau', '<-', 'intersect', 'union', 'x', 'cross join', 'join',
    'inner join', 'natural join', 'left join', 'right join', 'left outer join',
    'right outer join', 'full outer join', 'left semi join', 'right semi join', 'anti join',
    'and', 'or', 'xor', 'distinct', 'select distinct', 'from', 'where', 'order by', 'asc', 'desc',
    'inner join', 'inner', 'join', 'natural', 'union', 'intersect', 'outer join', 'natural join',
    'left join', 'right join', 'left outer join', 'right outer join', 'full outer join', 'group by',
    'having', 'limit', 'offset', 'and', 'or', 'xor'
];