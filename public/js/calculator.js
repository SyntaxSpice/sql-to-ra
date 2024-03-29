//select * from (select * from S union select * from T) as R where d<150
//select * from R innet join S on R.b = S.b
//select b as sum from R group by b having sum < 9
//select * from (select * from S union select * from T) as R where d < 150

let operators = [
    "select ", "where ", "order ", "group ", "by ", "union ", "from ", "inner ", "left ", "right ", "join ", "having", " as ", "(", ")", " on ", ",", "distinct ", " ", "=", ">", "<", "!="
];

let conformity = {
    "select": "π",
    "distinct": "",
    "where": "σ",
    "having": "σ",
    "order": "τ",
    "group": "γ",
    "by": "",
    //    "union": "∪",
    "union": "U",
    "from": "from",
    "inner": "⋈",
    "left": "⟕",
    "right": "⟖",
    "join": "",
    "as": "ρ",
    "*": "*",
    "(": "(",
    ")": ")",
    "on": "on",
    ",": "",
    " ": "",
    "!=": "≠"
};

let priority = {
    "all": 2,
    "in": 2,
    "exists": 2,
    "any": 2,
    "π": 4,
    "σ": 2,
    "X": 1,
    "τ": 6,
    "γ": 6,
    "U": 7,
    "⋈": 3,
    "⟕": 3,
    "⟖": 3,
    "ρ": 5,
    "R": 0,
    "S": 0
};

let originalC = ["a", "b", "c", "d", "*"];
let columns = ["a", "b", "c", "d", "r.a", "r.b", "r.c", "s.c", "s.d"];
let mathFunc = ["sum", "avg", "max", "min"];

for(let i = 0; i < originalC.length; i++){
     columns.push(`count(${originalC[i]})`);
}

for(let i = 0; i < mathFunc.length; i++){
    columns.push(`${mathFunc[i]}(a)`);
    columns.push(`${mathFunc[i]}(r.a)`);
    columns.push(`${mathFunc[i]}(d)`);
    columns.push(`${mathFunc[i]}(r.d)`);
}

let tables = ["r", "t", "s"];


let arr;
let resultStr = "";
let treeArr = [];

function setPriority() {
    treeArr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let key in priority) {
            if (~arr[i].indexOf(key)) {
                treeArr.push({
                    text: arr[i],
                    index: priority[key]
                });
                break;
            }
        }
    }
}

function concatColumnAndMathFunc(){
    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j<columns.length; j++){
            if(arr[i+1] && arr[i+2] && arr[i+3]){
                let str = arr[i]+arr[i+1]+arr[i+2]+arr[i+3];
                if(str == columns[j]){
                    arr[i] = str;
                    arr.splice(i+1, 3);
                }
            }
        }
    }
}

function parseString(val) {
    arr = [];
    resultStr = "";

    splitStirng(val);
    changeOperators();
    removeEmptyStr();
    remmoveSelectAll();

    removeEmptyStr();
    concatColumnAndMathFunc();
    replaceSelect();
    removeFrom();
    swapIfAsExist();
    concatAllElems();
    swapOn();
    concatJoin();

    removeEmptyStr();
    //    removeColumns();
    removeSameAs();


    returnUpperCase();
    //    subColumnNames();
    
    removeColumns();
    findBrackets();
    concatWhereSubOperators();
    checkMultiplication();
    concatStr();
    setPriority();

    console.log(arr);
    return resultStr;
}

function splitStirng(str) {
    let min;
    str = str.toLocaleLowerCase();
    while (str.length) {
        min = str.length;
        for (let i = 0; i < operators.length; i++) {
            let index = str.indexOf(operators[i]);
            if (~index && index < min) {
                min = index == 0 ? operators[i].length : index;;
            }
        }
        let newStr = str.substr(0, min).trim();
        arr.push(newStr);
        str = str.substr(min, str.length)
    }
}

function checkMultiplication(){
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "R" || arr[i] == "S"){
            if(arr[i+1] == "R" || arr[i+1] == "S"){
                arr.splice(i + 1, 0, "X");
            }
        }
    }
}

function changeOperators() {
    for (let i = 0; i < arr.length; i++) {
        let itemArr = arr[i].split(" ");
        let newItem = conformity[itemArr[0]];
        if (newItem != undefined) {
            arr[i] = arr[i].substr(itemArr[0].length, arr[i].length);
            arr[i] = (newItem + arr[i]).trim();
        }

    }
}

function remmoveSelectAll() {
    for (let i = 0; i < arr.length; i++) {
        let index = arr.indexOf("*");
        if (~index && arr[index+1] != ")" && arr[index-1] != "(") {
            arr.splice(index - 1, 2);
            i--;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (~arr[i].indexOf("π")) {
            let newStr = arr[i].substr(1, arr[i].length).trim();
            arr.splice(i + 1, 0, newStr);
            arr[i] = "π";
        }

    }
}

function removeEmptyStr() {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "" || arr[i] == ",") {
            arr.splice(i, 1);
            i--;
        }
    }
}

function findBrackets() {
    for (let i = 0; i < arr.length; i++) {
        let open = arr.indexOf("(");
        let close = arr.indexOf(")");
        let newStr = "";
        for (let j = open; j <= close; j++) {
            newStr += `${arr[j]} `;
        }
        if (~open && ~close) {
            arr[open] = newStr;
            arr.splice(open + 1, close - open);
        }

    }
}

function swapIfAsExist() {
    for (let i = 0; i < arr.length; i++) {
        if (~arr[i].indexOf("ρ")) {
            if (~arr[i - 1].indexOf(")") && columns.indexOf(arr[i - 1]) == -1) {
                for (let j = i; j >= 0; j--) {
                    if (~arr[j].indexOf("(")) {
                        arr.splice(j, 0, `${arr[i]} ${arr[i+1]}←`);
                        arr.splice(i + 1, 2);
                    }
                }
            } else {
                let arrow = tables.indexOf(arr[i-1]) == -1 ? "←" : " ";
                arr[i - 1] = `${arr[i]} ${arr[i+1]}${arrow}${arr[i-1]}`;
                arr.splice(i, 2);
            }

        }
    }
}

function swapOn() {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "on") {
            arr[i] = arr[i - 1];
            arr[i - 1] = arr[i + 1];
            arr.splice(i + 1, 1);
        }
    }
}

function replaceSelect() {
    for (let i = 0; i < arr.length; i++) {
        let columnsStr = "";
        let fromIndex;
        if (arr[i] == "π") {
            columnsStr = "π ";
            for (let j = i; j < arr.length; j++) {
                if (~arr[j].indexOf("from")) {
                    fromIndex = j;
                    break;
                }
                for (let n = 0; n < columns.length; n++) {
                    if (columns[n] == arr[j]) {
                        columnsStr += `${arr[j]},`;
                    }
                }
            }
        }
        if (columnsStr) {
            columnsStr = columnsStr.substr(0, columnsStr.length - 1);
            arr.splice(i, 1);
            arr.splice(fromIndex - 1, 0, columnsStr);

        }
    }
}

function removeSameAs() {
    for (let i = arr.length - 1; i > 0; i--) {
        if (~arr[i].indexOf("ρ") && arr[i - 1] && ~arr[i - 1].indexOf("ρ")) {
            arr[i - 1] += ", " + arr[i].substr(1, arr[i].length).trim();
            arr.splice(i, 1);
            //            arr[i] = arr[i].substr(1, arr[i].length).trim();
        }
    }
}

function removeFrom() {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "from") {
            arr.splice(i, 1);
        }
        let index = arr[i].indexOf("from");
        if (~index) {
            let a = arr[i].substr(0, index - 1);
            let b = arr[i].substr(index + 4, arr[i].length);
            arr[i] = a + b;
        }
    }
}

function removeColumns() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < columns.length; j++) {
            if (arr[i] == columns[j]) {
                arr.splice(i, 1);
                i--;
                continue;
            }
        }
    }
}

function concatStr() {
    for (let i = 0; i < arr.length; i++) {
        resultStr += `${arr[i]} `;
    }
}

function concatAllElems() {
    concatElems("<", "both");
    concatElems(">", "both");
    concatElems("γ", "right");
    concatElems("τ", "right");
    concatElems("=", "both");
    concatElems("≠", "both");
    concatElems("and", "both");
    concatElems("σ", "right");
    
    //    concatElems("U", "both");
}

function concatJoin(){
    concatElems("⋈", "right");
    concatElems("⟕", "right");
    concatElems("⟖", "right");
}

function concatWhereSubOperators(){
    concatElems("any", "right");
    concatElems("all", "right");
    concatElems("in", "both");
    concatElems("exists", "right");
    concatElems("not", "both");
    concatElems("not", "left");
}

function concatElems(elem, side) {
    for (let i = 0; i < arr.length; i++) {
        if (~arr[i].indexOf(elem)) {
            if (side == "both" && arr[i - 1] && arr[i + 1]) {
                arr[i - 1] += ` ${arr[i]}`;
                if (arr[i + 1]) {
                    arr[i - 1] += ` ${arr[i+1]}`;
                    arr.splice(i, 2);
                    continue;
                }
                arr.splice(i, 1);
            } else if (side == "left") {
                arr[i - 1] += ` ${arr[i]}`;
                arr.splice(i, 1);
            } else if (side == "right"){
                if (arr[i + 1]) {
                    arr[i] += ` ${arr[i+1]}`;
                    arr.splice(i + 1, 1);
                }

            }
        }
    }
}

function subColumnNames() {
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let cName;
        let columnNameExist = false;
        let index;
        for (let j = 0; j < columns.length; j++) {
            index = item.indexOf(` ${columns[j]}`);
            if (~index || item == columns[j]) {
                columnNameExist = true;
                cName = columns[j];
            }
            if (item == columns[j]) index = 0;
        }
        if (columnNameExist) {
            let fOld = item.substr(0, index);
            let lOld = item.substr(index + 2, item.length);
            let newStr = `${fOld}<sub>${cName}</sub>${lOld}`;
            arr[i] = newStr;
        }

    }
}

function returnUpperCase() {
    for (let i = 0; i < arr.length; i++) {
        if (~tables.indexOf(arr[i])) {
            arr[i] = arr[i].toUpperCase();
        }
    }
}


//select * from (select * from S union select * from T) as R where d<150
//select * from R innet join S on R.b = S.b
//select b as sum from R group by b having sum < 9