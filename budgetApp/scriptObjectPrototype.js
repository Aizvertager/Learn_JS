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

const AppData = function() {
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

// Функции добавляются в prototype

AppData.prototype.start = function() {

    if (salaryAmount.value === '') {
        start.setAttribute('disabled', 'disabled');
    }

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

    this.stopApp();
};
AppData.prototype.stopApp = function() {
    let inputsTypeText = document.querySelectorAll('input[type=text]');
    inputsTypeText.forEach(function(item) {
        item.disabled = true;
    });
    start.style.display = 'none';
    resetBtn.style.display = 'block';
};
AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.round(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    //Из массива объединяем в строку
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    
    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = periodSelect.value * _this.budget;
    });
};
AppData.prototype.addExpensesBlock = function() {
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
};
AppData.prototype.addIncomesBlock = function() {
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
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;
        } 
    });
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in _this.income) {
        this.incomeMonth += +_this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    //Делаем массив
    let addExpenses = additionalExpenses.value.split(',');
    //Перебираем массив и записываем в переменную
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomes.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
// Функция возвращает сумму всех расходов за месяц
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};
// Функция возвращает Накопления за месяц (Доходы минус расходы)
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
/*Функция подсчитывает за какой период будет достигнута цель, зная результат месячного накопления*/
AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventListeners = function() {
    start.addEventListener('click', this.start.bind(appData));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomesBlock);
    
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
};

const appData = new AppData();

AppData.prototype.eventListeners();



    
    
    
    
    
    
    
    