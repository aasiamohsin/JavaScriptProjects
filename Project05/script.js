const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const totalWorthBtn = document.getElementById('calculate-total');

// Initializing Ata Array

let data = [];

// Function to Fetch Random User Data from API
// API: randomuser.me/api

async function generateRandomUser() {

    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random()*1000000),
        image: `${user.picture.thumbnail}`
        };

    addData(newUser); 
};

// Add newley generated data into Data Array

function addData(newUser) {
    data.push(newUser)

    updateDOM();
}

// Function to Update the UI with DOM

function updateDOM(inputData = data) {

    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>'

    inputData.forEach( item => {
        const element = document.createElement('div');

        element.classList.add('name');
        element.innerHTML = `<strong><img src = '${item.image}'>${item.name}</strong> ${formatCurrency(item.worth)} `;
        
        main.appendChild(element);
    });

}

// Function to format net worth into currency 

function formatCurrency(num) {
    return '$ ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

// Function to Double the Net Worth of each user

function doubleMoney() {
    data = data.map( item => {
        return {...item,worth: item.worth * 2}

    })

    updateDOM();
}

// function to sort user by richest

function sortRichest() {
    data.sort(( a,b ) => b.worth - a.worth);

    updateDOM();
}

// function to show only millionaires

function showMillionairesOnly() {

    data = data.filter( item => item.worth > 1000000);

    updateDOM();
}

// Function to calculate the total net worth of all users

function totalNetWorth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const elementTotalNetWorth = document.createElement('div');
    elementTotalNetWorth.innerHTML = `<h3><strong>Total Worth: </strong> ${formatCurrency(totalWorth)}</h3>`
    main.appendChild(elementTotalNetWorth)

}

// Event Listeners

addUserBtn.addEventListener('click', generateRandomUser);

doubleMoneyBtn.addEventListener('click', doubleMoney);

sortBtn.addEventListener('click', sortRichest);

showMillionaireBtn.addEventListener('click', showMillionairesOnly);

totalWorthBtn.addEventListener('click', totalNetWorth)



generateRandomUser();
generateRandomUser();
generateRandomUser();




