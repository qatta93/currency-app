const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i=0; i < dropList.length; i++){
    for(currency_code in country_list){
        let selected;
        //default currencies
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";            
        }else if(i == 1){
            selected = currency_code == "PLN" ? "selected" : "";  
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e=>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}


//after loading, getExchangeRate shows up
getButton.addEventListener('load', () => {
    getExchangeRate();
})

getButton.addEventListener('click', e => {
    e.preventDefault();
    getExchangeRate();
})

//changing ways of exchanging
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

        //default amount of money
function getExchangeRate(){
    const amount = document.querySelector('.amount input');
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/95d037c6686d08ec2e950e0e/latest/${fromCurrency.value}`;
    //show result property from selected object
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    });

};