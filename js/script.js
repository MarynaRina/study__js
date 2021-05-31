'use strict';

let money = Number(prompt('Ваш месячный доход?', '100000'));
let income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
`Books, Utility Bills, Language Lessons`);
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = 3;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей');

let expenses1 = prompt('Введите обязательную статью расходов', 'Лекарства, проезд');
let amount1 = Number(prompt('Во сколько это обойдется?', 7000));
let expenses2 = prompt('Введите обязательную статью расходов', 'Интернет, продукты');
let amount2 = Number(prompt('Во сколько это обойдется?', 11000));

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);

let budgetDay = (budgetMonth / 30);
console.log('Бюджет на день: ', Math.floor(budgetDay));

console.log('Цель будет достигнута за: ', Math.ceil(mission / budgetMonth));

let array = addExpenses.split(",");
console.log(array);


if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}
if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
}
if (budgetDay >= 0 && budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} 
if (budgetDay < 0 ) {
    console.log('Что то пошло не так');
}

// alert('Прекрасный день для изучения JavaScript!!!');
// console.log('Сегодня идёт дождь');

