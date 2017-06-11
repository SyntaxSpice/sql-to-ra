//select * from (select * from S union select * from T) as R where d<150
//select * from R innet join S on R.b = S.b
//select b as sum from R group by b having sum < 9
//select * from (select * from S union select * from T) as R where d < 150

let operators = [
    "select ", "where ", "order ", "group ", "by ", "union ", "from ", "inner ", "left ", "right ", "join ", "having", " as ", "(", ")", " on ", ",", "distinct ", " "
];

let conformity = {
    "select": "π",
    "distinct": "",
    "where": "σ",
    "having": "σ",
    "order": "τ",
    "group": "γ",
    "by": "",
    "union": "∪",
    "from": "from",
    "inner": "⋈",
    "left": "⟕",
    "right": "⟖",
    join: "",
    "as": "ρ",
    "*": "*",
    "(": "(",
    ")": ")",
    "on": "",
    ",": "",
    " ": ""
};

let columns = ["a", "b", "c"];
let tables = ["r", "t", "s"];


let arr;

function parseString(val) {
    arr = [];
        
    splitStirng(val);
    changeOperators();
    removeEmptyStr();
    remmoveSelectAll();   
    
    removeEmptyStr();
    replaceSelect();
     removeFrom();
       findBrackets();
    swapIfAsExist();
    

    removeEmptyStr();
//    removeColumns();
    removeSameAs();
    
    console.log(arr);
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

function changeOperators() {
     for(let i = 0; i<arr.length; i++){
        let itemArr = arr[i].split(" ");
        let newItem = conformity[itemArr[0]];
         if(newItem != undefined){
            arr[i] = arr[i].substr(itemArr[0].length, arr[i].length);
            arr[i] = (newItem + arr[i]).trim(); 
         }
               
    }
}

function remmoveSelectAll() {
    for(let i = 0; i<arr.length; i++){
        let index = arr.indexOf("*");
        if(~index) {
            arr.splice(index-1, 2);
            i--;
        }
    }
    for(let i = 0; i<arr.length; i++){
        if(~arr[i].indexOf("π")){
            let newStr = arr[i].substr(1, arr[i].length).trim();
            arr.splice(i+1, 0, newStr);
            arr[i] = "π";            
        }

    }
}

function removeEmptyStr() {
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "" || arr[i] == ",") {
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
            newStr += arr[j];
        }
        if (~open && ~close) {
            arr[open] = newStr;
            arr.splice(open + 1, close - open);
        }

    }
}

function swapIfAsExist(){    
    for(let i = 0; i<arr.length; i++){
        if(~arr[i].indexOf("ρ")) {
            arr[i-1] = `${arr[i]} ${arr[i+1]}←${arr[i-1]}`;
            arr.splice(i,2);
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
        if(columnsStr){
            columnsStr = columnsStr.substr(0, columnsStr.length - 1);
            arr.splice(i, 1);
            arr.splice(fromIndex-1, 0, columnsStr);
            
        }        
    }
}

function removeSameAs() {
    for(let i = arr.length-1; i>0; i--){
        if(~arr[i].indexOf("ρ") && arr[i-1] && ~arr[i-1].indexOf("ρ")){
            arr[i-1] += ",";
            arr[i] = arr[i].substr(1, arr[i].length).trim();
        }
    }
}

function removeFrom() {
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == "from"){
            arr.splice(i, 1);
        }
        let index = arr[i].indexOf("from");
        if(~index){
            let a = arr[i].substr(0, index-1);
            let b = arr[i].substr(index+4, arr[i].length);
            arr[i]= a+b;
        }
    }
}

function removeColumns() {
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < columns.length; j++){
            if(arr[i] == columns[j]){
                arr.splice(i, 1);
            }
        }
    }
}


//select * from (select * from S union select * from T) as R where d<150
//select * from R innet join S on R.b = S.b
//select b as sum from R group by b having sum < 9