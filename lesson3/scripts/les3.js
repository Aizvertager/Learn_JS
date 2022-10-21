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

if (budgetDay > 800) { // > 27000
    console.log('Высокий уровень дохода'); 
} else if (budgetDay > 300 && budgetDay < 800) { // 9500
    console.log('Средний уровень дохода');
} else if (budgetDay > 0 && budgetDay < 300) { // 900
    console.log('Низкий уровень дохода');
} else {
    console.log('Что то пошло не так');
}

console.log(money);
console.log(income);
console.log(deposit);
console.log(budgetMonth);
console.log('За ' + Math.ceil(mission / budgetMonth) + ' месяц/ев будет достигнута цель')
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

// Приведение строки addExpenses к нижнему регистру 
addExpenses = addExpenses.toLowerCase().split(',');
console.log(addExpenses);

console.log('Результат: ' + budgetDay);
console.log('Остаток от деления: ' + (money % 30));

// Сложное задание
let num = 266219,
    sum = 1;
num = String(num).split('');
for (let i = 0; i < num.length; i++) {
    sum *= Number(num[i]);
}
console.log(sum);
sum = String(sum**3);
console.log(sum.substr(0,2));
