// Создаем обработчик страницы

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Таймер
    const countTimer = function(deadline) {
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
        const updateClock = function() {
            let time = timeRemaining();
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

        const startTimer = setInterval(updateClock, 1000);

    };

    countTimer('21 november 2022');

    // Меню

    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              menuItems = menu.querySelectorAll('ul>li');
        
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menuBtn.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (e) => {
            let target = e.target;
        
            if (target.closest('.close-btn')) {
                menu.classList.toggle('active-menu');
            } 
        });

        menuItems.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                handlerMenu();
                e.preventDefault();
                const link = e.target.getAttribute('href');
                
                document.querySelector(link).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }); 
    };

    toggleMenu();

    // Модальное окно "Оставить заявку"
    const togglePopup = () => {
        const popupBtns = document.querySelectorAll('.popup-btn'),
              popup = document.querySelector('.popup');

        popupBtns.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popup.addEventListener('click', (e) => {
            let target = e.target;
            
            if (target.closest('.popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });

    };

    togglePopup(); 

    // Кнопка скролла на главном экране
    const btnScroll = () => {
        const btn = document.querySelector('[href="#service-block"]');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const link = btn.getAttribute('href');
            
            document.querySelector(link).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    btnScroll();

    // Табы
    const tabs = () => {
        let serviceHeader = document.querySelector('.service-header'),
            tabHeader = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const showContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabHeader[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabHeader[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        serviceHeader.addEventListener('click', (e) => {
            let target = e.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tabHeader.forEach((elem, i) => {
                    if (elem === target) {
                        showContent(i);
                    }
                });
            }

        });
    };

    tabs();
});

