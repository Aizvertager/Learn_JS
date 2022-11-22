window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let square = document.querySelector('.square'),
        startAndStop = document.querySelector('#button'),
        reset = document.querySelector('#reset'),
        moveSquare,
        moving = false,
        count = 0;
    
    let animateSquare = function() {
        moveSquare = requestAnimationFrame(animateSquare);

        count++;
        square.style.left = count + 'px';

        if (count >= 500) {
            cancelAnimationFrame(moveSquare);
        }
    };

    let resetAnimation = function() {
        square.style.left = 0;
        moving = false;
    };

    startAndStop.addEventListener('click', () => {
        if (moving) {
            moveSquare = requestAnimationFrame(animateSquare);
            moving = false;
        } else {
            moving = true;
            cancelAnimationFrame(moveSquare);
        }
    });

    reset.addEventListener('click', resetAnimation);
    
});