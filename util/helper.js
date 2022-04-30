import errorsAuth from "constants/errorsAuth.json"

export function stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export function getRandomNumber(min, max, decimals = 0) {
    let aleatorio = Math.random() * (max - min) + min
    return parseFloat(aleatorio.toFixed(decimals));
}

export function getAuthError(error) {
    return errorsAuth?.find(e => error === e.code)?.description ?? 'Ha ocurrido un error, por favor inténtelo más tarde';
}

export const toMoney=(param,decimales=2)=>{
    return (Number(param)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: decimales, minimumFractionDigits: decimales });
}

export const withLeftZeros=(param)=>{
    let finalnum=param+"";
    while(finalnum.length<4){
        finalnum="0"+finalnum;
    }
    return finalnum;
}

//PONER COLOR COMO PLACEHOLDER EN IMAGENES
export const keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

export const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

export const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
    
//PONER COLOR COMO PLACEHOLDER EN IMAGENES