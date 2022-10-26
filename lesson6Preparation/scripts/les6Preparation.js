'use strict';

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 2700);
        }
        while(isNaN(money) || money === '' || money === null || money === 0);
    };

start();

// Проверка на число и строку
function validNumber(item) {
    return (isNaN(item) || item === '' || item === null || item === 0);
}

function validStr(item) {
    return (!isNaN(item) || item === '' || item === null);
}

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 6,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработок?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный источник заработка?', 'Такси');
            } while (validStr(itemIncome));

            do {
                cashIncome = +prompt('Сколько вы на этом зарабатываете?', 10000);
            } while (validNumber(cashIncome)); 

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
            nameExpenses;
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            do {
                nameExpenses = prompt('Введите обязательную статью расходов?', 'Шопинг');
            } while (validStr(nameExpenses));

            let priceExpenses = +prompt('Во сколько это обойдется?', 10000);
            
            appData.expenses[nameExpenses] = priceExpenses;
        }
    },
    // Функция возвращает сумму всех расходов за месяц
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    /*Функция подсчитывает за какой период будет достигнута цель, зная результат месячного накопления*/
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (validNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (validNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

let expensesAmount = appData.expensesMonth;
console.log('Расходы за месяц: ' + expensesAmount);

if (appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяц/ев');
}

// Функция, которая выводит уровень заработка
let getStatusIncome = function () {
    if (appData.budgetDay > 800) { // > 27000
        return ('Высокий уровень дохода'); 
    } else if (appData.budgetDay > 300 && appData.budgetDay < 800) { // 9500
        return ('Средний уровень дохода');
    } else if (appData.budgetDay > 0 && appData.budgetDay < 300) { // 900
        return ('Низкий уровень дохода');
    } else {
        return ('Что то пошло не так');
    }
};
 
// Статус заработка
console.log(getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + appData[key]);
}

let arr = [];
for (let i of appData.addExpenses) {
    i = i[0].substr(0, 1).toUpperCase() + i.slice(1);
    arr.push(i);
}

console.log(arr.join(', '));


