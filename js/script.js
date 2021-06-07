'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(sentences) {
    if (! /^[a-zA-Z0-9]+$/.test(sentences)) {
        return sentences;
    }
};

let checkNumber = function(n, message){
    do {
        n = prompt(message);
    } while(!isNumber(n));
};

let checkString = function(n, message){
    do {
        n = prompt(message);
    } while(!isString(n));
};

let money,
    start = function() {
    do {
        money = prompt('Ваш доход за месяц?');
    } while (!isNumber(money));
};
start();


const getAddExpenses = function () {
    let num = 0;
            do {
                num = prompt('Во сколько это обойдется?', '2000');
            } while (!isNumber(num));
    return +num;
};

// НАЧАЛО
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    percentDeposit: 0,
    moneyDeposit:0,
    mission: 1000000,
    period: 3,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {

        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = '';
            checkString(itemIncome, 'Какой у вас дополнительный заработок?');

            let cashIncome = 0;
            checkNumber(cashIncome, 'Сколько в месяц вы на этом зарабатываете?');
            appData.income[itemIncome] = +cashIncome;
        }

        let addExpenses = '';
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                'интернет, книги, еда');
        } while (!isString(addExpenses, true));
        
        appData.addExpenses = addExpenses.split(',').map(x => x.trim());
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for (let i = 0; i < 2; i++) {
                let str = '';
                do {
                    str = prompt('Введите обязательную статью расходов?');
                } while (!isString(str));
                
                appData.expenses[str] = getAddExpenses();

            }

        },
    getExpensesMonth: function() {
        appData.expensesMonth = 0;
        for (let elem in appData.expenses) {
            appData.expensesMonth += appData.expenses[elem];
        }
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
          return Math.ceil(appData.mission / appData.budgetMonth);
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
            if(appData.deposit){
                let n = 0;
                checkNumber(n, 'Какой годовой процент?');
                appData.percentDeposit = +n;
                checkNumber(appData.moneyDeposit, 'Какая сумма заложена?');
                appData.moneyDeposit = +n;

            }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();
console.log('Расходы: ' + appData.addExpenses.map((val, i) => val[0].toUpperCase() + val.slice(1)).join(', '));
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(targetMonth >= 0 ?
    `Цель будет достигнута за: ${targetMonth} месяцев)` :
    'Цель не будет достигнута');
console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}

const getButtonStart = document.getElementById('start');
console.log('buttonStart: ', getButtonStart);

const incomeAdd = document.getElementsByTagName('button')[0];
console.log('incomeAdd: ', incomeAdd);
const expensesAdd = document.getElementsByTagName('button')[1];
console.log('expensesAdd: ', expensesAdd);

const depositCheck = document.querySelector('#deposit-check');
console.log('checkBox: ', depositCheck);

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log('additionalIncomeItem: ', additionalIncomeItem);

// RESULT
const budgetMonthValue = document.querySelector('.budget_month-value');
console.log('budgetMonthValue: ', budgetMonthValue);
const budgetDayValue = document.querySelector('.budget_day-value');
console.log('budgetDayValue: ', budgetDayValue);
const expensesMonthValue = document.querySelector('.expenses_month-value');
console.log('expensesMonthValue: ', expensesMonthValue);
const additionalIncomeValue = document.querySelector('.additional_income-value');
console.log('additionalIncomeValue: ', additionalIncomeValue);
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
console.log('additionalExpensesValue: ', additionalExpensesValue);
const incomePeriodValue = document.querySelector('.income_period-value');
console.log('incomePeriodValue: ', incomePeriodValue);
const targetMonthValue = document.querySelector('.target_month-value');
console.log('targetMonthValue: ', targetMonthValue);

const salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount: ', salaryAmount);
const incomeItems = document.querySelector('.income-items');
console.log('incomeTitle: ', incomeItems.children[0]);
console.log('incomeAmount: ', incomeItems.children[1]);
const expensesItems = document.querySelector('.expenses-items');
console.log('expensesTitle: ', expensesItems.children[0]);
console.log('expensesAmount: ', expensesItems.children[1]);
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem: ', additionalExpensesItem);
const depositAmount = document.querySelector('.deposit-amount');
console.log('depositAmount: ', depositAmount);
const depositPercent = document.querySelector('.deposit-percent');
console.log('depositPercent: ', depositPercent);
const targetAmount = document.querySelector('.target-amount');
console.log('targetAmount: ', targetAmount);

const periodSelect = document.querySelector('.period-select');
console.log('periodSelect: ', periodSelect);
