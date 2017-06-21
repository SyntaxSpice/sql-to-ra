if (!String.prototype.splice) {
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

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
    "π": 3,
    "σ": 1,
    "τ": 5,
    "γ": 5,
    "U": 6,
    "inner": 2,
    "left": 2,
    "right": 2,
    "ρ": 4,
    "R": 0,
    "S": 0
};

let columns = ["a", "b", "c", "d", "r.a", "r.b", "r.c", "s.c", "s.d", "sum(a)", "sum(r.a)", "sum(d)", "sum(s.d)"];
let tables = ["r", "t", "s"];


let arr;
let resultStr = "";
let treeArr = [];

function parseString(val) {
    arr = [];
    resultStr = val;
    
    resultStr = addSpaces(resultStr, ",");
    resultStr = addSpaces(resultStr, ")");
    resultStr = addSpaces(resultStr, "(");
    
    arr = resultStr.split(" ");
    console.log(arr);

}

function addSpaces(val, operator) {
    let str = val;
    let result = "";
    let currentIndex = 0;

    (function findOperator() {
        let newStr = str;
        let index;
        
        index = newStr.indexOf(operator);
        if (~index && newStr[index - 1] != " ") {
            newStr = newStr.splice(index, 0, " ");
        }

        index = newStr.indexOf(operator);
        if (~index && newStr[index + 1] != " ") {
            newStr = newStr.splice(index + 1, 0, " ");
        }
        
        index = newStr.indexOf(operator);
        if(~index){
            result += newStr.substr(0, index+1);
            str = newStr.substr(index+1, newStr.length);
            findOperator();
        }
        else{
            result += str;
        }

    })();
    
    return result;
}