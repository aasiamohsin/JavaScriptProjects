const cryptoCurrency = document.getElementById('cryptocurrency');
const targetCurrency = document.getElementById('target-currency');
const cryptoAmount = document.getElementById('crypto-amount');
const currencyAmount = document.getElementById('currency-amount');
const cryptoRate = document.getElementById('rate');
const reset = document.getElementById('reset');

// All Functions
// Fetch cryptocurrency exchange rate from third party api
// www.cryptocompare.com/API

function calculateCryptoRate() {

    const cryptoCurrPick = cryptoCurrency.value;
    const targetCurrPick = targetCurrency.value;

    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoCurrPick}&tsyms=${targetCurrPick}`)
    .then ( res => res.json())
    .then ( data => {
        console.log(data)

        const  crytoXchgRate = data[targetCurrPick];

        // Update currency amount with crypto currency

        currencyAmount.value = (cryptoAmount.value * crytoXchgRate).toFixed(2)

        // Display and update exchange rates 

        cryptoRate.innerText = `${cryptoAmount.value} ${cryptoCurrency.value} = ${currencyAmount.value} ${targetCurrency.value}`

    })
}

// All Event listeners

cryptoCurrency.addEventListener('change', calculateCryptoRate);

targetCurrency.addEventListener('change', calculateCryptoRate);

cryptoAmount.addEventListener('input', calculateCryptoRate);

currencyAmount.addEventListener('input', calculateCryptoRate);

// Event listener  and function on reset button

reset.addEventListener('click', e => {

    cryptoRate.value = `${cryptoCurrency.value} = ${currencyAmount.value} ${targetCurrency.value}`;
    cryptoCurrency.value = 'BTC';
    targetCurrency.value = 'USD';
    cryptoAmount.value = 1;
    currencyAmount.value = ''

    calculateCryptoRate()
})


calculateCryptoRate();