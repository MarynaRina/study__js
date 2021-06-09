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

let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

// НАЧАЛО
let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    percentDeposit: 0,
    moneyDeposit:0,
    mission: 1000000,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        
    },
    showResult: function() {
        budgetMonthValue.value = +appData.budgetMonth;
        budgetDayValue.value = +appData.budgetDay;
        expensesMonthValue.value = +appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();

    },
    addExpensesBlock: function() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        if (document.querySelectorAll('.income-items').length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        appData.incomeMonth = 0;
        document.querySelectorAll('.income-items').forEach(function(item)  {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
 
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if(item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        appData.expensesMonth = 0;
        for (let elem in appData.expenses) {
            appData.expensesMonth += appData.expenses[elem];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(+appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
          return targetAmount.value / appData.budgetMonth;
    },
    
    getStatusIncome: function(){
        if (appData.budget >= 1200) {
        return ('У вас высокий уровень дохода');
        }
        if (appData.budget >= 600 && appData.budget < 1200) {
        return ('У вас средний уровень дохода');
        }
        if (appData.budget >= 0 && appData.budget < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего');
        } 
        if (appData.budget < 0 ) {
        return ('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
            if (appData.deposit) {
            let n = 0;
            do {
                n = prompt('Какой годовой процент?', '10');
            } while (!isNumber(n) && n > 0);
            appData.precentDeposit = +n;
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(n) && n > 0);
            appData.moneyDeposit = +n;
        }
    },
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
    changePeriodSelect: function(e) {
        document.querySelector('.period-amount').textContent = e.target.value;
        incomePeriodValue.value = appData.calcPeriod();
    },
    blockStart: function() {
        start.disabled = !salaryAmount.value.trim();
    }
};

appData.blockStart();
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.blockStart);

const addEventChangeNumber = function(event) {
    let value = event.target.value;
    const changeInputNumber = function(event) {
         if (!/^[\d]+$/.test(event.target.value)) {
            alert('Можно ввести только цифры!');
            event.target.value = value;
            event.target.removeEventListener('change', changeInputNumber);
        }
        value = event.target.value;
    };
    event.target.addEventListener('change', changeInputNumber);
};
const addEventChangeText = function(event) {
    let value = event.target.value;
    const changeInputText = function(event) {
        if (!/^[,. а-яА-ЯёЁ]+$/.test(event.target.value)) {
            alert('Можно ввести только русские буквы, пробелы, точки и запятые!');
            event.target.value = value;
            event.target.removeEventListener('change', changeInputText);
        }
        value = event.target.value;
    };
    event.target.addEventListener('change', changeInputText);
};
document.querySelectorAll('[placeholder="Наименование"]').forEach(function(input){
    input.addEventListener('focus', addEventChangeText);
});
document.querySelectorAll('[placeholder="Сумма"]').forEach(function(input){
    input.addEventListener('focus', addEventChangeNumber);
});

const targetMonth = appData.getTargetMonth();
console.log('Расходы: ' + appData.addExpenses.map((val, i) => val[0].toUpperCase() + val.slice(1)).join(', '));

console.log(targetMonth >= 0 ?
    `Цель будет достигнута за: ${targetMonth} месяцев)` :
    'Цель не будет достигнута');


console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}

