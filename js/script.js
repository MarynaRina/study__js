'use strict';

let money = Number(prompt('Ваш месячный доход?', '100000'));
let income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
`Books, Utility Bills, Language Lessons`);
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 3;

// 7. showTypeOff
let showTypeOff = function(data) {
    console.log(data, typeof(data));
};
showTypeOff(money);
showTypeOff(income);
showTypeOff(deposit);

let expenses1 = prompt('Введите обязательную статью расходов', 'Лекарства, проезд');
let amount1 = Number(prompt('Во сколько это обойдется?', 7000));
let expenses2 = prompt('Введите обязательную статью расходов', 'Интернет, продукты');
let amount2 = Number(prompt('Во сколько это обойдется?', 11000));

// 1. функция getExpensesMonth
const getExpensesMonth = function() {
    return amount1 + amount2;
};
console.log('Обязательные расходы за месяц:', getExpensesMonth());

// 2. функция getAccumulatedMonth
const getAccumulatedMonth = function() {
    return money - getExpensesMonth();
};

// 3. переменная accumulatedMonth
const accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц:', accumulatedMonth);

// 4. функция getTargetMonth
const getTargetMonth = function() {
    return (mission / accumulatedMonth);
};
console.log('Цель будет достигнута за:',  Math.ceil(getTargetMonth()) + ' месяцев');

// 6. Переменная budgetDay
let budgetDay = (accumulatedMonth / 30);
console.log('Бюджет на день:', Math.floor(budgetDay));

// 7. массив возможных расходов
let array = addExpenses.split(",");
console.log(array);

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





// const accumulatedMonth = function(money, expenses) {
//     return getAccumulatedMonth(money, getExpensesMonth());
// };


// console.log(getTargetMonth());
// alert('Прекрасный день для изучения JavaScript!!!');
// console.log('Сегодня идёт дождь');

