const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

// Dummy Transaction

/* const dummyTransaction = [
    {id: 1, description: 'salary', amount: 150000},
    {id: 2, description: 'Electric-Bill', amount: -30000},
    {id: 3, description: 'Groceries', amount: -20000}
]; */

let transactions = [];

if(localStorage.getItem('transactions')) {

   transactions = JSON.parse( localStorage.getItem('transactions'));
}

// Function to generate ID

function generateID() {
    return Math.floor(Math.random() *  1000 ) ;
};


// Add new transaction from the form

function addTransaction(e) {

    e.preventDefault();

    if(description.value.trim() == '' || amount.value.trim() == '') {
        alert('Please provide a valid description and transaction amount.');
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        console.log(transaction);

        localStorage.setItem('transactions', JSON.stringify(transactions));

        addTransactionUI(transaction);
        updateSums();

        description.value = '';
        amount.value = '';

    };
};

// Function to delete the transaction

function deleteTransaction(id) {

    transactions = transactions.filter( transaction => transaction.id != id );

    init();
}

// Function to display transactions in transaction history

function addTransactionUI(transaction) {

    // Classify if the transacton is income or expense

    const type = transaction.amount > 0 ? '+' : '-';

    // Create DOM element for list item

    const item = document.createElement('li');

    // Add class for list item based on type 

    item.classList.add( transaction.amount > 0 ? 'plus' : 'minus' );

    item.innerHTML = `

    ${transaction.description}
    <span>${type}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
};

// Function to update the balance, income and expense summaries

function updateSums() {
    
    // Create array of transaction amounts from transaction array

    const amounts = transactions.map( transaction => transaction.amount );

    console.log(amounts);

    // Calculate total vlaue for balance

    const total = amounts
    .reduce( (acc, amount ) => ( acc += amount ), 0 )
    .toFixed(2)

    // Calculate total income

    const income = amounts
    .filter( amount => amount > 0)
    .reduce(( acc, amount ) => (acc += amount), 0)
    .toFixed(2)

    // Calculate total expense

    const expense = amounts
    .filter( amount => amount < 0 )
    .reduce( (acc, amount ) => ( acc += amount ), 0 )
    .toFixed(2)


    // Update balance in DOM

    balance.innerText = `${total} PKR`;

    // Update Income in DOM 

    moneyPlus.innerText = `${income} PKR`;

    // UPdate Expense in DOM 

    moneyMinus.innerText = `${expense} PKR`

}

// Function to initialize the app

function init() {

    list.innerHTML = '';

    transactions.forEach(addTransactionUI);

    updateSums();
}

// Event listener for form submit

form.addEventListener('submit', addTransaction);

init();
