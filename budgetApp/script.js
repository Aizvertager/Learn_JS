'use strict';

let start = document.querySelector('#start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomes = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    accumulatedMonthValue = document.querySelector('.accumulated_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    resetBtn = document.querySelector('#cancel'),
    targetAmount = document.querySelector('.target-amount');

    //Объект
let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {

        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'disabled');
        }

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();

        appData.stopApp();
        

    },
    stopApp: function() {
        let inputsTypeText = document.querySelectorAll('input[type=text]');
        inputsTypeText.forEach(function(item) {
            item.disabled = true;
        });
        start.style.display = 'none';
        resetBtn.style.display = 'block';
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.round(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        //Из массива объединяем в строку
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = periodSelect.value * appData.budget;
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true),
            expensesTitle = cloneExpensesItem.querySelector('.expenses-title'),
            expensesAmount = cloneExpensesItem.querySelector('.expenses-amount');

        expensesTitle.value = '';
        expensesAmount.value = '';

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomesBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true),
            incomeTitle = cloneIncomeItem.querySelector('.income-title'),
            incomeAmount = cloneIncomeItem.querySelector('.income-amount');

        incomeTitle.value = '';
        incomeAmount.value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            } 
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            this.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        //Делаем массив
        let addExpenses = additionalExpenses.value.split(',');
        //Перебираем массив и записываем в переменную
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomes.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    // Функция возвращает сумму всех расходов за месяц
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    /*Функция подсчитывает за какой период будет достигнута цель, зная результат месячного накопления*/
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    }

};

start.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomesBlock);
periodSelect.addEventListener('input', function(event) {
    periodAmount.innerHTML = event.target.value;
});
resetBtn.addEventListener('click', function() {
    let allInputs = document.querySelectorAll('input[type=text]');
    allInputs.forEach(function(item) {
        item.value = '';
    }); 
    periodSelect.value = 1;
    periodAmount.innerHTML = 1;
});
    
    
    
    
    
    
    
    
    
    