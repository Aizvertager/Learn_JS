let money = 170,
    income = 'Такси',
    addExpenses = 'хлеб, молоко, мясо',
    deposit = false,
    mission = 1000,
    period = 6,
    budgetDay = money / 30;

console.log(money);
console.log(income);
console.log(deposit);
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

// Приведение строки addExpenses к нижнему регистру 
addExpenses = addExpenses.toLowerCase().split(', ');
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
