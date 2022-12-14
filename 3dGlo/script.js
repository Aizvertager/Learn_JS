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

        let menuBtn = document.querySelector('.menu'),
            body = document.querySelector('body'),
            menuDiv = document.querySelector('menu');

        document.addEventListener('click', (e) => {
            let target = e.target;
            if(target.closest('.menu')) {
                menuDiv.classList.toggle('active-menu');
            } else if (!target.closest('menu')) {
                menuDiv.classList.remove('active-menu');
            }
        });

        menuDiv.addEventListener('click', (e) => {
            let target = e.target;
            
            if(target.classList.contains('close-btn')) {
                menuDiv.classList.toggle('active-menu');
            } else if (target.closest('ul>li')) {

                menuDiv.classList.toggle('active-menu');
                e.preventDefault();
                target = target.closest('a[href*="#"]');
                let liId = target.getAttribute('href'),
                    divElement = document.querySelector('' + liId);
                //Плавный скролл
                divElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }
                
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

    // Слайдер
    const slider = () => {

        let slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item');
        
        const addDots = () => {
            let ul = document.createElement('ul');
            ul.classList.add('portfolio-dots');
            slider.append(ul);
    
            for(let i = 0; i < slide.length; i++) {
                let dot = document.createElement('li');
                dot.classList.add('dot');
                ul.append(dot);
            }
        };            
        addDots();
        
        let dots = document.querySelectorAll('.dot'),
            currentSlide = 0,
            interval;
        
        dots[0].classList.add('dot-active');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };  

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        }; 

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide > slide.length - 1) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = () => {
            interval = setInterval(autoPlaySlide, 1500);
        };

        startSlide();

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;
            
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dots.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (e) => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
                startSlide();
            }
        });

    };
    slider();
});

