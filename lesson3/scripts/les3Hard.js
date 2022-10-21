//1. Задание
let ruDay = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
let engDay = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'];

let lang = prompt('Введите на каком языке хотите вывести инф', 'ru или eng');

if (lang == 'ru') {
    console.log(ruDay);
} else if (lang == 'eng') {
    console.log(engDay)
} else {
    console('Вы ввели неверно')
}

switch (lang) {
    case 'ru':
        console.log(ruDay);
        break;
    case 'eng':
        console.log(engDay);
        break;
    default:
        console.log('Вы ввели неверно') 
}

var arr = {
	'ru':['пн', 'вт', 'ср','чт', 'пт', 'сб', 'вс'],
	'eng':['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'],
};
alert(arr[lang]);