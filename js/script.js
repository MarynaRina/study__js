'use strict';

let   start = document.getElementById('start'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeItems = document.querySelectorAll('.income-items'),
      incomeAmount = document.querySelector('income-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select');
      
let money;
const namePlace =  document.querySelectorAll('[placeholder="Наименование"]');
const sumPlace = document.querySelectorAll('[placeholder="Сумма"]');
let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

// НАЧАЛО

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function(){
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        const _this = this;
        if (start.textContent === 'Рассчитать') {
            _this.blockInputs();
            start.textContent = 'Сбросить';
        } else {
            start.textContent = 'Рассчитать';
            _this.reset();
            _this.getExpenses();
        }
};

AppData.prototype.blockInputs = function (disabled = true) {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
        item.disabled = disabled;
    });
    document.querySelector('.data input[type=checkbox]').disabled = disabled;
    incomePlus.disabled = disabled;
    expensesPlus.disabled = disabled;
};

AppData.prototype.reset = function() {
    for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
   
    incomePlus.style.display = '';
    expensesPlus.style.display = '';
    this.blockInputs(false);
    document.querySelectorAll('input[type=text]').forEach(item => {
        item.value = '';
    });
    periodSelect.value = document.querySelector('.period-amount').textContent = 1;
    
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposit = 0;
    this.moneyDeposit = 0;
    this.expensesItems = 0;
    
    this.blockStart();
    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = _this.calcPeriod();
};

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
};

AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
        
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(item => {             
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = +cashExpenses;
            }
    });
};

AppData.prototype.getIncome = function() {
     const _this = this;
     this.incomeMonth = 0;
        incomeItems.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
                _this.incomeMonth += +cashIncome;
            }
    });

    for (let key in this.income) {
        _this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
};

AppData.prototype.getExpensesMonth = function() {
     this.expensesMonth = 0;
        for (let elem in this.expenses) {
            this.expensesMonth += this.expenses[elem];
        }
};

AppData.prototype.getBudget = function(){
    this.budget = +salaryAmount.value;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor (this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function(){
        return targetAmount.value / this.budgetMonth;
};
    
AppData.prototype.getStatusIncome = function(){
    if (this.budget >= 1200) {
        return ('У вас высокий уровень дохода');
    }
    if (this.budget >= 600 && this.budget < 1200) {
        return ('У вас средний уровень дохода');
    }
    if (this.budget >= 0 && this.budget < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } 
    if (this.budget < 0 ) {
        return ('Что то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function(){
    // this.deposit = confirm('Есть ли у вас депозит в банке?');
    //     if (this.deposit) {
    //     let n = 0;
    //     do {
    //         n = prompt('Какой годовой процент?', '10');
    //     } while (!isNumber(n) && n > 0);
    //     this.precentDeposit = +n;
    //     do {
    //         this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    //     } while (!isNumber(n) && n > 0);
    //     this.moneyDeposit = +n;
    // }
    this.moneyDeposit = 0;
};

AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriodSelect = function (event) {
    
    document.querySelector('.period-amount').textContent = event.target.value;
    incomePeriodValue.value = this.calcPeriod();
};

AppData.prototype.blockStart = function() {
    start.disabled = !salaryAmount.value.trim();
};

AppData.prototype.eventsListeners = function() {
    this.blockStart();
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.changePeriodSelect.bind(this));
    salaryAmount.addEventListener('input', this.blockStart);
    namePlace.forEach(input => {
        input.addEventListener('input', function(){
            this.value = this.value.replace(/[^а-я ]/g, '');
        });
    });
    sumPlace.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '');
        });
    });
};





const appData = new AppData();

console.log(appData);
appData.eventsListeners();



