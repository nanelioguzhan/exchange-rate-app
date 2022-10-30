const before = document.querySelector("span")
const after = document.querySelector("h1")
const input = document.querySelector("input")
const select = document.querySelectorAll("select")
const converted = document.querySelector("#converted")
const convertBtn = document.querySelector("button")


fetch("https://api.frankfurter.app/currencies")
.then(data => data.json())
.then(data => display(data))

//creating currency options for select element
const display = data => {
    const currencies = (Object.entries(data))
    for(let i = 0; i < currencies.length; i++) {
        select[0].innerHTML += `<option value="${currencies[i][0]}">${currencies[i][0]}</option>`
        select[1].innerHTML += `<option value="${currencies[i][0]}">${currencies[i][0]}</option>`
    }
}

//convert button event
convertBtn.addEventListener("click", () => {
    let filledCurrency = select[0].value
    let wantedCurrency = select[1].value
    let value = input.value
    
    if(filledCurrency != wantedCurrency) {
        convert(filledCurrency, wantedCurrency, value)
    }else {
        alert("You have chosen same currency")
        input.value = ""
    }
})

//convert method
const convert = (filledCurrency, wantedCurrency, value) => {
    const host = "api.frankfurter.app"
    fetch (
        `https://${host}/latest?amount=${value}&from=${filledCurrency}&to=${wantedCurrency}`
    )
    .then(value => value.json())
    .then(value => {
        //use object key to get fullname of currencies
        fetch("https://api.frankfurter.app/currencies")
        .then(response => response.json()
            .then( currs => {
            converted.value = Object.values(value.rates)[0];
            before.textContent = `${input.value} ${currs[filledCurrency]} =`
            after.textContent = `${converted.value} ${currs[wantedCurrency]}`
        }))
    })
}

//prevent whitespace input
input.addEventListener('keypress', function (e) {  
    var key = e.keyCode;
     if (key === 32) {
       e.preventDefault();
     }
     if (e.which < 48 || e.which > 57)
     {
         e.preventDefault();
     }
});
