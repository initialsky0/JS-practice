const sortNumList = (list) => list.sort((a, b) => a-b);

const dedupeNumlist = (list) => {
    const orderList = sortNumList(list);
    let dedupeList = [orderList[0]];
    let dedupeIndex = 0;
    for(let i = 1; i < orderList.length; i++) {
        if(orderList[i] !== dedupeList[dedupeIndex]){
            dedupeList.push(orderList[i]);
            dedupeIndex++;
        }
    }
    return dedupeList;
}

const cleanNumList = (list) => {
    const dedupeList = dedupeNumlist(list);
    const cleanList = dedupeList.map(value => {
        const filtResult = list.filter(num => num === value);
        if(filtResult.length === 1){
            return filtResult[0];
        } else{
            return filtResult;
        }
    })
    return cleanList;
}

const partNumStrList = (list) => {
    const numList = list.filter(value => typeof(value) === 'number');
    const strList = list.filter(value => typeof(value) === 'string');
    return [numList, strList];
}

const cleanList = (list) => partNumStrList(list).map(value => cleanNumList(value));


const sumTargetNum = (list, target) => {
    const result = [];
    const dedupeList = dedupeNumlist(list);
    dedupeList.forEach((value, index) => {
        let value2 = dedupeList.slice(index + 1).filter(num => num === target-value);
        if(value2.length > 0){
            result.push([value, value2[0]]);
        }
    })
    const halfTarg = target / 2;
    const sameNum = list.filter(value => value === halfTarg);
    if(sameNum.length > 1){
        result.push([halfTarg, halfTarg]);
    }

    return result;
}

const getColor2Hex = (color) => {
    
    let hex = Math.floor(color);
    if(hex > 255){
        hex = 255;
    } else if(hex < 0 || isNaN(hex)){
        hex = 0;
    }

    hex = (hex < 16) ? ('0' + hex.toString(16)) : hex.toString(16);
    return hex;

}

const getHex2Color = (hex) => {
    if(hex.length === 1){
        hex += '0';
    }
    let num = Math.abs(parseInt(hex, 16));
    if(isNaN(num)){
        num = 0;
    }
    return num;
}

const checkColorHex = (hex) => {
    return hex[0] === '#' ? hex.slice(1, 7) : hex.slice(0, 6);
}

const convertColor = (value1, value2 = 0, value3 = 0) => {
    const str = 'string';
    const num = 'number';
    if(typeof(value1) === str){
        const rgbHex = checkColorHex(value1);
        const rNum = getHex2Color(rgbHex.slice(0, 2));
        const gNum = getHex2Color(rgbHex.slice(2, 4));
        const bNum = getHex2Color(rgbHex.slice(4));
        return [rNum, gNum, bNum];

    } else if(typeof(value1) === num && typeof(value2) === num && typeof(value3) === num){
        return '#' + getColor2Hex(value1) + getColor2Hex(value2) + getColor2Hex(value3);

    }
}
