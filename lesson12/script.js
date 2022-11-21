window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let text = document.querySelector('.text'),
        dateNow = new Date(),
        dateNewYear = new Date('01 January 2023'),
        timeDay = dateNow.getHours(),
        timeRemaining = dateNewYear.getTime() - dateNow.getTime(),
        days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        timeNow = dateNow.toLocaleTimeString('en-US'),
        dayToNewYear = Math.floor(timeRemaining / 1000 / 60 / 60 / 24),
        helloDay = '',
        day;

    if (timeDay >= 5 && timeDay < 12) {
        helloDay += 'Доброе утро';
    } else if (timeDay >= 12 && timeDay < 16) {
        helloDay += 'Добрый день';
    } else if (timeDay >= 16 && timeDay < 24) {
        helloDay += 'Добрый вечер';
    } else if (timeDay >= 24 && timeDay < 5) {
        helloDay += 'Доброй ночи';
    } 

    for (let index of days.keys()) {
        if (index === dateNow.getDay()) {
            day = days[index];
        }
    }

    console.log(`
        ${helloDay}
        Сегодня ${day}
        Текущее время: ${timeNow}
        До нового года осталось ${dayToNewYear} дней
    `);
});