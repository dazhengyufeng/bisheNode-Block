//JSON的所有key   大写转化成小写并添加下划线
export function uppercaseSwtich_(data){
    let dataKeys = Object.keys(data);
    let _data = {};
    let lowerDataKeys = dataKeys.forEach(( el, index )=> {
        _data[ el.replace( /[A-Z]/g, '_$&' ).toLowerCase() ] = data[ el ]
    })
    return _data;
}

//JSON的所有key   下划线去掉 并且 下划线后面那单词转大写转
export function _SwtichUpperCase(data){
    let dataKeys = Object.keys(data);
    let _data = {};
   dataKeys.forEach(( el, index )=> {
       //下划线后面那个字符转大写
       let minUpperStr = [...el];
       minUpperStr.forEach(( str, i ) => {
            if(str === '_'){
                minUpperStr.splice(i+1,1,minUpperStr[i+1].toUpperCase())
            }
       })
        _data[ minUpperStr.join('').replace( /_/g, '' ) ] = data[ el ]
    })
    return _data;
}