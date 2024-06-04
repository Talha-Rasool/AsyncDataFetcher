'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function getCountry(data,className=''){
  const html=`
  <article class="country${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(data.population /1000000).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
`;

countriesContainer.insertAdjacentHTML('beforeend',html);
countriesContainer.style.opacity=1;

};


//  const request= fetch(`https://restcountries.com/v2/name/portugal`)
// console.log(request);

function getCountryData(country){
  fetch(`https://restcountries.com/v2/name/${country}`).then(response=>{
    console.log(response)
    return response.json();
}).then(function(data){
  console.log(data)
  getCountry(data[0])
  const neighbor=data[0].borders[3];
  if(!neighbor) return;
  return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)
}).then(response => response.json()).then(data => getCountry(data,'neighbour'))

}
getCountryData('pakistan')