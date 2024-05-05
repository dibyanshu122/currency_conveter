const apiKey = '23650ef178c02769b7786858';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#from-button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for( let select of dropdowns){
for(currnCode in countryList) {
   let newOption = document.createElement("option");
   newOption.innerText=currnCode;
   if(select.name === "from" && currnCode === "USD") {
    newOption.selected= "selected";
   }else if(select.name === "to" && currnCode === "INR") {
    newOption.selected= "selected";

   }

   select.append(newOption);
}

select.addEventListener("change", (evt) => {
  updateFlag(evt.target);
});
}

const updateExchangeRate = async () => {
  let amount = document.querySelector("#amount-input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.conversion_rates[toCurr.value];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount}`;
};

const updateFlag = (element) => {
  let currnCode = element.value;
  let countryCode = countryList[currnCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener(" ", () => {
  updateExchangeRate();
});

  
