'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    getNumberFromUser = function(message){
    return prompt(message);
    };

const checkNumber = function () {
     let num = 0;
            do {
                num = prompt('Во сколько это обойдется?', '2000');
            } while (!isNumber(num));
            return +num;
};

// НАЧАЛО
do {
    money = getNumberFromUser('Ваш доход за месяц?');
} while(!isNumber(money));

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    mission: 1000000,
    period: 3,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы', 'Books, Utility Bills, Language Lessons');
            appData.addExpenses = addExpenses.toLowerCase().split(",");
            appData.deposit = confirm('Есть ли у вас депозит в банке?');  

            for (let i = 0; i < 2; i++) {
            appData.expenses[prompt('Введите обязательную статью расходов?')] = checkNumber();
            }

        },
    getExpensesMonth: function() {
        appData.expensesMonth = 0;
        for (let elem in appData.expenses) {
            appData.expensesMonth += appData.expenses[elem];
        }
    },
    getTargetMonth: function(){
          return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getBudget: function(){
        if (!appData.budget) {
            appData.budget = 0;
        }
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return Math.floor(appData.getExpensesMonth / 30);
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
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log(targetMonth >= 0 ?
    `Цель будет достигнута за: ${targetMonth} месяцев)` :
    'Цель не будет достигнута');
console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}