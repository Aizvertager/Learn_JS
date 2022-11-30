window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    let colorText = document.querySelector('#color'),
        btn = document.querySelector('#change'),
        arrColor = [
            '#FFFFFF',
            '#2196F3',
            '#4CAF50',
            '#FF9800',
            '#009688',
            '#795548',
        ];
    
    const RandomColor = () => {
        let randomIndex = Math.floor(Math.random() * 6); 
        for(const [index, key] of arrColor.entries()) {
            if (randomIndex === index) {
                return key;
            }
        }
    };

    const changeColor = () => {
        let color = RandomColor();
        document.querySelector('body').style.background = color;
        btn.style.color = color;
        colorText.innerHTML = `${color}`;
    };

    btn.addEventListener('click', changeColor);

});