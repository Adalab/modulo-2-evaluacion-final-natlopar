'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const containerFav = document.querySelector('.js-containerFav');
const containerRes = document.querySelector('.js-containerRes');


let seriesResult= [];// array.data, contiene los arrays 

function handleSearchApi (event) {
    event.preventDefault();
    const inputValue = input.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
        seriesResult= dataApi.data;
        renderSeries(seriesResult, containerRes);
        
    })
}
    
btnSearch.addEventListener('click', handleSearchApi);

function renderSeries(seriesResult, containerRes) {
    for (const serie of seriesResult) {
        console.log(seriesResult);
        const titleText = document.createTextNode(serie.title);
        const imageUrl = serie.images.jpg.image_url;
        if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'){
            imageUrl = 'https://placehold.co/210x295?text=Image';
        };
        const li = document.createElement('li');
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute('src', imageUrl);
        containerRes.appendChild(li);
        li.appendChild(article);
        article.appendChild(img);
        article.appendChild(titleText);
    }
}
