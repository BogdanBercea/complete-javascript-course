'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov} €</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} €`
}

const calcDisplaySummary = function ({ movements, interestRate }) {
  const incomes = movements.filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = movements.filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = movements.filter((mov) => mov > 0)
    .map((deposit) => (deposit * interestRate) / 100)
    .filter((int) => int > 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumIn.textContent = `${incomes} €`;
  labelSumOut.textContent = `${Math.abs(out)} €`;
  labelSumInterest.textContent = `${interest} €`
}

const createUsernames = function (accs) {
  accs.forEach(account => {
    account.username = account.owner.toLowerCase().split(' ').map((word) => word[0]).join('');
  });
}

createUsernames(accounts);

const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
}

const hideUI = function () {
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
}

// Event Handlers
let currentAccount;
let sortedMovements = false;

const login = function (event) {
  event.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = `Invalid username or pin`;
  }

  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
}

const transferMoney = function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (amount > 0
    && receiverAccount
    && currentAccount.balance >= amount
    && receiverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);

    inputTransferTo.value = ''
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }
}

const closeAccount = function (event) {
  event.preventDefault();

  if (currentAccount.username === inputCloseUsername.value
    && currentAccount.pin === Number(inputClosePin.value)
  ) {
    const indexToDelete = accounts.findIndex((acc) => acc.username === currentAccount.username);
    accounts.splice(indexToDelete, 1);
    hideUI();
  } else {
    alert('Invalid username or pin provided');
  }

  inputClosePin.value = '';
  inputCloseUsername.value = '';
  inputClosePin.blur();
}

const requestLoan = function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
}

const sortMovements = function (event) {
  event.preventDefault();

  displayMovements(currentAccount.movements, !sortedMovements);
  sortedMovements = !sortedMovements;
}

// Event Listeners
btnLogin.addEventListener('click', login);
btnTransfer.addEventListener('click', transferMoney);
btnClose.addEventListener('click', closeAccount);
btnLoan.addEventListener('click', requestLoan);
btnSort.addEventListener('click', sortMovements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const juliaDogs = [3, 5, 2, 12, 7];
// const kateDogs = [4, 1, 15, 8, 3];

// const printDogs = (arr1, arr2) => {
//   let correctJuliaDogs = arr1.slice(1, juliaDogs.length);
//   correctJuliaDogs = correctJuliaDogs.slice(0, correctJuliaDogs.length - 2)
//   const allDogs = [...correctJuliaDogs, ...arr2];

//   allDogs.forEach((years, index) => {
//     if (years >= 3) {
//       console.log(`Dog number ${index} is an adult, and is ${years} years old.`)
//     } else {
//       console.log(`Dog number ${index} is still a puppy.`)
//     }
//   });

// }

// printDogs(juliaDogs, kateDogs);

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements.filter((mov) => mov > 0).map((mov) => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);