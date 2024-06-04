'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
console.log('hello');

function getCountryData(country) {
  fetch(`https://countries-api-836d.onrender.com/${country}/`)
    .then(response => response.json())
    .then(data => console.log(data));
}

console.log(getCountryData('pakistan'));
