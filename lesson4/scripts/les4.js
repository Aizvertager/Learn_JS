let money = prompt('Ваш месячный доход?', 27000),//12000, 5000
    income = 'Такси',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли увас депозит в банке?'),
    mission = 100000,
    period = 6,
    budgetDay,
    expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Шопинг'),
    answerExpenses1 = Number(prompt('Во сколько это обойдется?', 10)),
    expenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Кино'),
    answerExpenses2 = Number(prompt('Во сколько это обойдется?', 10)),
    budgetMonth;

budgetMonth = money - (answerExpenses1 + answerExpenses2);
budgetDay = Math.floor(budgetMonth / 30);

// Приведение строки addExpenses к нижнему регистру 
addExpenses = addExpenses.toLowerCase().split(',');
let accumulatedMonth = getAccumulatedMonth();

// Функция возвращает сумму всех расходов за месяц
function getExpensesMonth() {
    return answerExpenses1 + answerExpenses2;
}

// Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

// Функция подсчитывает за какой период будет достигнута цель, 
//зная результат месячного накопления
function getTargetMonth() {
    return Math.ceil(mission / getAccumulatedMonth());
}

// Функция, которая выводит уровень заработка
function getStatusIncome(EnterbudgetDay) {
    if (EnterbudgetDay > 800) { // > 27000
        console.log('Высокий уровень дохода'); 
    } else if (EnterbudgetDay > 300 && EnterbudgetDay < 800) { // 9500
        console.log('Средний уровень дохода');
    } else if (EnterbudgetDay > 0 && EnterbudgetDay < 300) { // 900
        console.log('Низкий уровень дохода');
    } else {
        console.log('Что то пошло не так');
    }
}

// Функция, которая выводит тип переменной 
function showTypeof(type) {
    console.log(typeof type)
}

// Накопления за период
let periodMoney = budgetMonth * period;
console.log(periodMoney);

// Срок достижения цели в месяцах
console.log(getTargetMonth());

