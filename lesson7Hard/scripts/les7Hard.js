'use strict';

let dateNow = new Date(),
    hour = dateNow.getHours(),
    minutes = dateNow.getMinutes(),
    seconds = dateNow.getSeconds(),
    day = dateNow.getDay(),
    month = dateNow.getMonth() + 1,
    year = dateNow.getFullYear();

function zeroPlus (data) {
    if (data < 10) {
        return '0' + data;
    } else {
        return data;
    }
}

let text = zeroPlus(hour) + ':' + zeroPlus(minutes) + ':' + zeroPlus(seconds) + ' ' + zeroPlus(day) + '.' + zeroPlus(month) + '.' + year;

console.log(text);