let money,
    income = 'Такси',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6,
    budgetDay,
    expenses1,
    expenses2,
    budgetMonth;

let start = function() {
    do {
        money = prompt('Ваш месячный доход?', 2700);
    }
    while(isNaN(money) || money === '' || money === null || money === 0);
};

start();

// Функция возвращает сумму всех расходов за месяц
let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses1 = prompt('Введите обязательную статью расходов?', 'Шопинг');
        }
        if (i === 1) {
            expenses2 = prompt('Введите обязательную статью расходов?', 'Кино');
        }
        
        do {
            sum += +prompt('Во сколько это обойдется?', 10000);
            console.log('sum: ', sum);
        }
        while (isNaN(sum) || sum === '' || sum === null);
    }

    return sum;
};
let expensesAmount = getExpensesMonth();
console.log(expensesAmount);

// Функция возвращает Накопления за месяц (Доходы минус расходы)
let accumulatedMonth = function () {
    return money - expensesAmount;
};

// Функция подсчитывает за какой период будет достигнута цель, 
//зная результат месячного накопления
let getTargetMonth = function () {
    return Math.ceil(mission / accumulatedMonth());
};

// Функция, которая выводит уровень заработка
let getStatusIncome = function () {
    if (budgetDay > 800) { // > 27000
        return ('Высокий уровень дохода'); 
    } else if (budgetDay > 300 && budgetDay < 800) { // 9500
        return ('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 300) { // 900
        return ('Низкий уровень дохода');
    } else {
        return ('Что то пошло не так');
    }
};

// Функция, которая выводит тип переменной 
let showTypeof = function (type) {
    console.log(typeof type);
};

// Приведение строки addExpenses к нижнему регистру 
console.log(addExpenses.toLowerCase().split(','));

budgetDay = Math.floor(accumulatedMonth() / 30);
 
// Накопления за период
let periodMoney = accumulatedMonth() * period;
console.log(periodMoney);

if (getTargetMonth() < 0) {
    console.log('getTargetMonth: ', getTargetMonth());
    console.log('Цель не будет достигнута');
} else {
    console.log('getTargetMonth: ', getTargetMonth());
    console.log('Цель будет достигнута');
}
// Срок достижения цели в месяцах
console.log(getTargetMonth());

// Статус заработка
console.log(getStatusIncome());

