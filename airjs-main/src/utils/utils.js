function inputDimension(input){
    const t = toString.call(input);
    if(t === "[object String]" || t === "[object Number]"){
        return 0
    }
    if(t === "[object Array]"){
        return 1 + inputDimension(input[0]);
    }

}

module.exports = {inputDimension};
