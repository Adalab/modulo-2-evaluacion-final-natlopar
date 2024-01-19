'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const containerFav = document.querySelector('.js-containerFav');
const containerRes = document.querySelector('.js-containerRes');
let seriesResult = []; // array.data, contiene los arrays
let favoriteSeries = [];

function handleSearchApi(event) {
  event.preventDefault();
  const inputValue = input.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      seriesResult = dataApi.data;
      renderSeries(seriesResult, containerRes);
    });
}

btnSearch.addEventListener('click', handleSearchApi);

function renderSeries(seriesResult, containerRes) {
  for (const serie of seriesResult) {
    const idCard = serie.mal_id;
    const titleText = document.createTextNode(serie.title);
    let imageUrl = serie.images.jpg.image_url;
    const newImageUrl = 'https://placehold.co/210x295?text=Image';
    if (
      imageUrl ===
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      imageUrl = newImageUrl;
    }
    const li = document.createElement('li');
    const articleEl = document.createElement('article');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    img.setAttribute('src', imageUrl);
    img.setAttribute('alt', 'imagen anime');
    containerRes.appendChild(li);
    li.appendChild(articleEl);
    articleEl.appendChild(img);
    title.appendChild(titleText);
    articleEl.setAttribute('class', 'js-article');
    articleEl.setAttribute('id', idCard);
    articleEl.appendChild(title);
    listenerSeries();
  }
}

function listenerSeries() {
  const articles = document.querySelectorAll('.js-article');
  for (const article of articles) {
    article.addEventListener('click', handleAddFavorites);
  }
}

function handleAddFavorites(event) {
  const card = event.currentTarget;
  card.classList.add('favorite');
  console.log(card.id);

  const idCardSelected = event.currentTarget.id;
  card.classList.add('favorite');
  const foundSerieId = seriesResult.find((oneSerie) => {
       if(idCardSelected === oneSerie.mal_id) {
        favoriteSeries.push(oneSerie);
       } ;
   
    })
    console.log(favoriteSeries);
  }


