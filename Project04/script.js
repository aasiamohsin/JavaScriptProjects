const currOne = document.getElementById('currency-one');
const currTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const flipBtn = document.getElementById('flip');
const currRate = document.getElementById('rate');

//Fetch exchange rate from 3rd party API and update DOM
// www.exchangerate-api.com

function calculate(){
    const currOnePick = currOne.value;
    const currTwoPick = currTwo.value;



    fetch(`https://v6.exchangerate-api.com/v6/47e1d93211a13d8aa3d8552a/latest/${currOnePick}`)
    .then( res => res.json())
    .then( data => {
        const exchangeRate = data.conversion_rates[currTwoPick];
        console.log(exchangeRate)

        // Display conversion rate

        currRate.innerText = `1 ${currOnePick} = ${exchangeRate} ${currTwoPick}`;

        // Apply conversion rate and update amount of currency two

        amountTwo.value = (amountOne.value * exchangeRate).toFixed(2);

    })
}

// Function to reverse currency on flip button

function flip() {
    const temp = currOne.value;
    currOne.value = currTwo.value;
    currTwo.value = temp;

    calculate();
}


// Event listeners

currOne.addEventListener('change', calculate);
currTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
flipBtn.addEventListener('click', flip);


calculate();

