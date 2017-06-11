let arr = [];
let resultArr;
let cIndex = 0;

function parseString(val) {
    cIndex = 0;
    arr = val.split(" ");
    resultArr = [];
    let result = "";
    
    
    for (cIndex = 0; cIndex < arr.length; cIndex++) {
        resultArr.push(findSQLWord(arr[cIndex], cIndex));
    }
    resultArr.forEach((a)=>{
        return result+= ` ${a}`;
    });
    return result;
}




function findSQLWord(word) {
    let lWord = word.toLowerCase();
    let result;
    let empty = "";

    switch (lWord) {
    case "select":
        result = arr[cIndex+1] == "*" ? empty : "π";
        break;
    case "distinct":
        result = empty;
        break;
    case "*":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    case "where":
        result = "σ";
        break;
    case "as":
        result = checkOpAs();
        break;
    case "order":
        result = "τ";
        break;
    case "group":
        result = "γ";
        break;
    case "by":
        result = empty;
        break;
    case "union":
        result = "∪";
        break;
    case "intersect":
        result = "∩";
        break;
    case "from":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    case "from":
        result = empty;
        break;
    default:
        result = word;
    }

    return result;
}

function checkOpAs() {
    let operatorIsExist,
        operatorAs = "",
        opAsIsExist,
        result,
        prev = arr[cIndex - 1],
        next = arr[cIndex + 1];

    for (let i = cIndex - 1; i > -1; i--) {
        let item = arr[i].toLowerCase();
        if (item == "from" || item == "select") {
            operatorIsExist = true;
        }
        if (item == "as") {
            opAsIsExist = true;
            if (operatorIsExist) {
                operatorAs = "ρ";
            }
            break;
        }
    }

    if (!opAsIsExist) {
        operatorAs = "ρ";
    }

    if (~next.indexOf(",")) {
        prev += ",";
        next = next.substr(0, next.length - 1);
    }

    result = operatorAs + ` ${next}←${prev}`;
    cIndex++;
    resultArr.splice(resultArr.length - 1, 1);
    
    return result;
}