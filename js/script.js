let money = 600000;
let income = 'freelance';
let addExpenses = `Books, Utility Bills, Language Lessons`;
let deposit = Boolean('Я стану крутым JS разработчиком');
let mission = 1000000;
let period = 3;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'долларов');

let budgetDay = (money / 30);
console.log('budgetDay: ', budgetDay);

let array = addExpenses.split(",");
console.log(array);


// alert('Прекрасный день для изучения JavaScript!!!');
// console.log('Сегодня идёт дождь');