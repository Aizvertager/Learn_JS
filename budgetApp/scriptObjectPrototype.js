'use strict';

let start = document.querySelector('#start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomes = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositCalc = document.querySelector('.deposit-calc'),
    depositPercent = document.querySelector('.deposit-percent'),
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
    //Делаем массив additionalExpenses
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    resetBtn = document.querySelector('#cancel'),
    targetAmount = document.querySelector('.target-amount');

    //Классы
const AppData = function() {
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
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
    //this.getAddExpenses();
    //this.getAddIncome();
    this.getInfoDeposit();
    this.getAddElem(additionalExpenses, this.addExpenses);
    this.getAddElem(additionalIncomes, this.addIncome);
    this.getBudget();
    this.showResult();

    this.stopApp();
};
AppData.prototype.stopApp = function() {
    const inputsTypeText = document.querySelectorAll('input[type=text]');
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
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};
AppData.prototype.addBlock = function (item, querySelect, typePlus) {
    const cloneItem = item[0].cloneNode(true),
        itemTitle = cloneItem.querySelector(`.${querySelect}-title`),
        itemAmount = cloneItem.querySelector(`.${querySelect}-amount`);
        
    itemTitle.value = '';
    itemAmount.value = '';
    item[0].parentNode.insertBefore(cloneItem, typePlus);

    item = document.querySelectorAll(`.${querySelect}-items`);
    
    if (item.length === 3) {
        typePlus.style.display = 'none';
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
AppData.prototype.getAddElem = function(elem, appDataElem) {
    if (elem === additionalExpenses) {
        elem = elem.value.split(',');
        console.log('elem: ', elem);
    }
    elem.forEach(function(item) {
        if (elem === additionalIncomes) {
            item = item.value.trim();
        } else {
            item = item.trim();
        }
        
        if (item !== '') {
            appDataElem.push(item);
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
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
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
    const _this = this;
    start.addEventListener('click', this.start.bind(appData));

    expensesPlus.addEventListener('click', () => {
        _this.addBlock(expensesItems, 'expenses', expensesPlus);
    });
    incomePlus.addEventListener('click', () => {
        _this.addBlock(incomeItems, 'income', incomePlus);
    });
    
    periodSelect.addEventListener('input', function(event) {
        periodAmount.innerHTML = event.target.value;
    });

    depositCheck.addEventListener('change', function() {
        if (depositCheck.checked) {
            appData.deposit = true;
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            depositBank.addEventListener('change', function() {
                let selectedIndex = this.options[this.selectedIndex].value;
                if (selectedIndex === 'other') {
                    depositPercent.style.display = 'inline-block';
                    depositPercent.value = '';
                } else {
                    depositPercent.style.display = 'none';
                    depositPercent.value = selectedIndex;
                }
            });
        } else {
            appData.deposit = false;
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
        }
    });

    resetBtn.addEventListener('click', function() {
        const allInputs = document.querySelectorAll('input[type=text]');
        allInputs.forEach(function(item) {
            item.value = '';
            item.disabled = false;
        }); 
        periodSelect.value = 1;
        periodAmount.innerHTML = 1;
        start.style.display = 'block';
        resetBtn.style.display = 'none';
    });    
};

const appData = new AppData();
appData.eventListeners();





    
    
    
    
    
    
    
    