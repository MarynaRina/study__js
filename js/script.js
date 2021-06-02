'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
    income = 'freelance',
    addExpenses = prompt('Перечислите возможные расходы', 
                         `Books, Utility Bills, Language Lessons`),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000,
    period = 3;

do {
    money = prompt('Ваш месячный доход?', '75000');
} while(!isNumber(money));


// 7. showTypeOff
let showTypeOff = function(data) {
    console.log(data, typeof(data));
};
showTypeOff(money);
showTypeOff(income);
showTypeOff(deposit);

// 1. функция getExpensesMonth

let expenses = [];
const getExpensesMonth = function() {
    let sum = 0;
    function func() {
    sum += (function() {
        let sum = 0;
            do {
                sum = prompt('Во сколько это обойдется?', 2000);
            } while (!isNumber(sum));
            return +sum;
        })(); 
    }
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', 'Лекарства, проезд');
        func();
    }
    return sum;
};


let expensesAmount = getExpensesMonth();

console.log('Обязательные расходы за месяц:', expensesAmount);

// 2. функция getAccumulatedMonth
const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

// 3. переменная accumulatedMonth
const accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц:', accumulatedMonth);

// 4. функция getTargetMonth
const getTargetMonth = function() {
    return (mission / accumulatedMonth);
};

const resTargetMonth = Math.ceil(getTargetMonth());
if (resTargetMonth < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log('Цель будет достигнута за:', resTargetMonth + ' месяцев'); 
}

// 6. Переменная budgetDay
let budgetDay = (accumulatedMonth / 30);
console.log('Бюджет на день:', Math.floor(budgetDay));

// 7. массив возможных расходов
console.log(addExpenses.toLowerCase().split(","));

// 7. функция getStatusIncome
let getStatusIncome = function() {
    if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
    }
    if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
    }
    if (budgetDay >= 0 && budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
    } 
    if (budgetDay < 0 ) {
    return ('Что то пошло не так');
    }
};
console.log(getStatusIncome());


