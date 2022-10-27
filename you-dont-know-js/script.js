'use strict';

let book = document.querySelectorAll('.book'),
    books = document.querySelector('.books');

// Сортировка книг
books.insertBefore(book[1], book[0]);
books.insertBefore(book[2], null);
books.insertBefore(book[4], book[3]);

// Восстановить порядок глав во второй и пятой книге
    // Вторая книга
    let bookTwoUl = book[0].querySelector('ul'),
        bookTwoUlLi = bookTwoUl.querySelectorAll('li'),
        bookFiveUl = book[5].querySelector('ul'),
        bookFiveUlLi = bookFiveUl.querySelectorAll('li');

    bookTwoUl.insertBefore(bookTwoUlLi[2], bookTwoUlLi[8]);
    bookTwoUl.insertBefore(bookTwoUlLi[6], bookTwoUlLi[4]);
    bookTwoUl.insertBefore(bookTwoUlLi[8], bookTwoUlLi[4]);
    bookTwoUl.insertBefore(bookTwoUlLi[9], bookTwoUlLi[2]);

    // Пятая книга
    bookFiveUl.insertBefore(bookFiveUlLi[9], bookFiveUlLi[2]);
    bookFiveUl.insertBefore(bookFiveUlLi[2], bookFiveUlLi[5]);
    bookFiveUl.insertBefore(bookFiveUlLi[5], bookFiveUlLi[7]);
    bookFiveUl.insertBefore(bookFiveUlLi[7], bookFiveUlLi[5]);

// Создание элемента li
let bookSix = document.createElement('li');
// Добавление текста в li
bookSix.textContent = 'Глава 8: За пределами ES6';

// Редактирование книги 6 (Добавление главы и восстановление порядка глав)
let bookSixUl = book[2].querySelector('ul'), //Нашли список глав 
    bookSixUlLi = bookSixUl.querySelectorAll('li'); // Выбрали все li
bookSixUl.appendChild(bookSix); // Добавили в список еще одну главу bookSix
bookSixUl.insertBefore(bookSixUlLi[9], bookSixUlLi[10]); // поменяли местами