function __isArrayInArray(arr, item){
     var item_as_string = JSON.stringify(item);
   
     var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
     });
     return contains;
}

function __copyVar(v) {
     return JSON.parse(JSON.stringify(v))
}

export {__copyVar, __isArrayInArray}