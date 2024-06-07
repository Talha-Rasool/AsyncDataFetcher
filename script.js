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
  const neighbor=data[0].borders[2];
  if(!neighbor) return;
  return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)
}).then(response => response.json()).then(data => getCountry(data,'neighbour'))

}
getCountryData('pakistan')

function whereAmI(lat,lng){
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  ).then(response=>{
    console.log(response)
    return response.json();
  }).then(data=>{
    console.log(data)
    console.log(`you are in ${data.city} ${data.countryName}`)
  })
}
whereAmI(-33.933, 18.474)



//building a promise
const lotteryPrice=new Promise(function(resolve,reject){
  console.log('Lottery is happening');
  setTimeout(function(){
    if(Math.random() >=0.5){
      resolve('You win')
    }else{
      reject(new Error('You lost'))
    }
  },2000)
})
lotteryPrice.then(res=> console.log(res)).catch(err=>console.log(err))

//promisifying
function wait(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve,seconds*1000)
  })

}
wait(2).then(()=>{
  console.log('i wait for 2 seconds')
return wait(1)
}
).then(()=> console.log('i waited for 1 second'))





function getCurrPosition(){
  return new Promise(function(resolve,reject){
    navigator.geolocation.getCurrentPosition(function(postion){
      resolve(postion)
    },err=>reject(err))
  })
}

getCurrPosition().then(pos=>{
  console.log(pos)
  return pos;
}).then(data=>{
  const {latitude:lat,longitude:lng}=data.coords;
  console.log(lat,lng)
return fetch(
  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
).then(post=>{
  console.log(post)
  return post.json()
}).then(data=>{
  console.log(`you are in ${data.city} ${data.countryName}`)

})
})

