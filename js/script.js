'use strict';

const start = document.getElementById('start'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.getElementById('deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeAmount = document.querySelector('income-amount'),
      expensesTitle = document.querySelector('.expenses-title'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      depositBank = document.querySelector('.deposit-bank'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      periodSelect = document.querySelector('.period-select');
      
let money,
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    namePlace =  document.querySelectorAll('[placeholder="Наименование"]'),
    sumPlace = document.querySelectorAll('[placeholder="Сумма"]'),
    procentPlace = document.querySelectorAll('[placeholder="Процент"]');

    
let isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
};


// НАЧАЛО

class AppData {
    constructor() {
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
    }

    start(){
        const _this = this;
        if (start.textContent === 'Рассчитать') {
            _this.getExpInc();
            _this.getExpensesMonth();
            _this.getAddExpInc();
            _this.getInfoDeposit();
            _this.getBudget();
            _this.showResult();
            _this.blockInputs();
            start.textContent = 'Сбросить';
        } else {
            start.textContent = 'Рассчитать';
            _this.reset();
        } 
    }

    blockInputs(disabled = true){
        document.querySelectorAll('.data input[type=text]').forEach(item => {
        item.disabled = disabled;
        });
        document.querySelector('.data input[type=checkbox]').disabled = disabled;
        depositCheck.disabled = disabled;
        depositBank.disabled = disabled;
        incomePlus.disabled = disabled;
        expensesPlus.disabled = disabled;
        }

    reset(){
        const excessRemoval = item => {
            for (let i = item.length - 1; i > 0; i--) {
                item[0].parentNode.removeChild(item[i]);
            }
        };
        excessRemoval(document.querySelectorAll('.income-items'));
        excessRemoval(document.querySelectorAll('.expenses-items'));
        
        this.blockInputs(false);

        incomePlus.style.display = '';
        expensesPlus.style.display = '';
        depositCheck.checked = false;

        this.depositHandler();
        
        document.querySelectorAll('input[type=text]').forEach(item => {
            item.value = '';
        });
        
        periodSelect.value = periodAmount.textContent = 1;
        
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
    }

    showResult(){
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay * 100) / 100;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = _this.calcPeriod();
    }

    getExpInc(){
        this.incomeMonth = 0;
        const count = item => {
        const startStr =  item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    addExpIncBlock(event){
        const target = event.target;
        const startStr = target.parentNode.className;
        const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
        cloneItem.querySelector(`.${startStr}-title`).value = '';
        cloneItem.querySelector(`.${startStr}-amount`).value = '';
        target.parentNode.insertBefore(cloneItem, target);
        if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
            target.style.display = 'none';
        }
        namePlace = document.querySelectorAll('[placeholder="Наименование"]');
        sumPlace = document.querySelectorAll('[placeholder="Сумма"]');

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
        
        
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');
    }

    getAddExpInc(){
        const addElem = item => {
        return item.map(el => el.trim()).filter(el => el !== '');
        };

        this.addExpenses = addElem(additionalExpensesItem.value.split(','));
        this.addIncome = addElem([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
    }

    getExpensesMonth(){
        this.expensesMonth = 0;
        for (let elem in this.expenses) {
            this.expensesMonth += this.expenses[elem];
        }
    }

    getBudget(){
        this.budget = +salaryAmount.value;
        const monthDeposit = Math.floor (this.moneyDeposit * (this.precentDeposit / 100));
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor (this.budgetMonth / 30);
    }

    getTargetMonth(){
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome(){
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
    }

    calcPeriod(){
         return this.budgetMonth * periodSelect.value;
    }

    changePeriodSelect(event){
        document.querySelector('.period-amount').textContent = event.target.value;
        incomePeriodValue.value = this.calcPeriod();
    }

    getInfoDeposit(){
        this.moneyDeposit = 0;
        this.precentDeposit = 0;
        if (this.deposit) {
            this.precentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    blockStart(){
        start.disabled = !salaryAmount.value.trim() || 
        (depositCheck.checked && !(depositPercent.value.trim() && depositAmount.value.trim()));    }

    changePercent(){
       
        const valueSelect = this.value;
        if (!valueSelect) {
            depositAmount.disabled = true;
        } else {
            depositAmount.disabled = false;
            if (valueSelect === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';

            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = valueSelect;
            }
        }
         
        
    }
    
    depositHandler(){
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositAmount.disabled = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
        this.blockStart();
    }

    eventsListeners(){
        this.blockStart();
        start.addEventListener('click', this.start.bind(this));
        expensesPlus.addEventListener('click', this.addExpIncBlock);
        incomePlus.addEventListener('click', this.addExpIncBlock);
        periodSelect.addEventListener('input', this.changePeriodSelect.bind(this));
        salaryAmount.addEventListener('input', this.blockStart);
        depositAmount.addEventListener('input', this.blockStart);
        depositPercent.addEventListener('input', this.blockStart); 
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
        
        procentPlace.forEach(input => {
            input.addEventListener('input', function(){
                this.value = this.value.replace(/[^\d]/g, '');
                let outputPercentage = parseInt(depositPercent.value);
                if (outputPercentage <= 0 || outputPercentage >= 100) {
                alert("Введите корректное значение в поле проценты.");
                this.value = '';
                depositPercent.focus();
                return false;
            }
                
            });
        });
        
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }

}





const appData = new AppData();
console.log('appData: ', appData);

appData.eventsListeners();



