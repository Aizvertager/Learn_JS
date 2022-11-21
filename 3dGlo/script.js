// Создаем обработчик страницы

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function timeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                // dateRemaining разница во времени в секундах
                dateRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(dateRemaining % 60),
                minutes = Math.floor((dateRemaining / 60) % 60),
                hours = Math.floor((dateRemaining / 60 / 60) % 24);

            return {dateRemaining, hours, minutes, seconds};
        }

        /* 
        * Реализация с помощью setTimeout
        *
        function updateClock() {
            let time = timeRemaining();
            console.log('time: ', time);

            timerHours.textContent = time.hours;
            timerMinutes.textContent = time.minutes;
            timerSeconds.textContent = time.seconds;

            if(time.dateRemaining > 0) {
                setTimeout(updateClock, 1000);
            }
        }*/
        function zeroPlus(time) {
            if (time < 10) {
                return '0' + time;
            } else {
                return time;
            }
        }

        // Реализация с помощью setInterval
        let updateClock = function() {
            let time = timeRemaining();
            console.log('time: ', time);
            if (time.dateRemaining < 0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(startTimer);
            } else {
                timerHours.textContent = zeroPlus(time.hours);
                timerMinutes.textContent = zeroPlus(time.minutes);
                timerSeconds.textContent = zeroPlus(time.seconds);
            }
        };

        let startTimer = setInterval(updateClock, 1000);

    }

    countTimer('22 november 2022');

});

