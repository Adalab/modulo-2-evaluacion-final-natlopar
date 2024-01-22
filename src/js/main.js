'use strict';
import './removeFavorite.js';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const containerFav = document.querySelector('.js-containerFav');
const containerRes = document.querySelector('.js-containerRes');
const btnRemoveAll = document.querySelector('.js-removeFav');
const btnReset = document.querySelector('.js-reset');
let card = '';
let seriesResult = [];
let favoriteSeries = [];

function handleSearchApi(event) {
  event.preventDefault();
  const inputValue = input.value.toLowerCase();
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      seriesResult = dataApi.data;
      renderSeries(seriesResult, containerRes);
    });
}

btnSearch.addEventListener('click', handleSearchApi);

function renderSeries(arraySeries, container) {
  container.innerHTML = '';
  const seriesLocalStorage = JSON.parse(localStorage.getItem('series'));
  for (const serie of arraySeries) {
    const titleText = document.createTextNode(serie.title);
    let imageUrl = serie.images.jpg.image_url;
    const newImageUrl = 'https://placehold.co/210x295?text=NoImageFound';
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
    const icon = document.createElement('i');
    
    articleEl.appendChild(icon);
    icon.setAttribute(
      'class',
      'fa-solid fa-circle-xmark js-btnRemove card__btn'
    );
    // icon.setAttribute('id', serie.mal_id);
   
    img.setAttribute('src', imageUrl);
    img.setAttribute('class', 'card__img');
    img.setAttribute('alt', 'imagen anime');
    articleEl.appendChild(img);

    container.appendChild(li);
    li.appendChild(articleEl);
   
    title.setAttribute('class', 'card__title');
    title.appendChild(titleText);

    articleEl.setAttribute('id', serie.mal_id);
    articleEl.setAttribute('class', 'js-article card');
    articleEl.appendChild(title);
    if (container === containerRes) {
      li.setAttribute('class', 'js-liResult');
      articleEl.removeChild(icon);
      if(seriesLocalStorage) {
        for(const serie of seriesLocalStorage){
          if (parseInt(articleEl.id) === serie.mal_id) {
          articleEl.classList.add('favorite');
          }
        }
      } 
    container.appendChild(li);

  }
  listenerClickResult();
  listenerRemoveFavorites();
}
}

function listenerRemoveFavorites() {
  const btnRemove = document.querySelectorAll('.js-btnRemove');
  for (const button of btnRemove) {
    button.addEventListener('click', handleRemoveFavorite);
  }
}

function listenerClickResult() {
  const articles = document.querySelectorAll('.js-article');
  for (const article of articles) {
    article.addEventListener('click', handleClickInResults);
  }
}

function handleClickInResults(event) {
  card = event.currentTarget;
  if (card.classList.contains('favorite')) {
    removeFavorite();
  } else {
    addFavorite();
  }
  
}

function addFavorite(event) {
  const liResult = card.parentElement;
  if (liResult.classList.contains('js-liResult')) {
    card.classList.add('favorite');
    const idCardSelected = card.id;
    const foundSerieId = seriesResult.find(
      (oneSerie) => parseInt(idCardSelected) === oneSerie.mal_id
    ); //    console.log(foundSerieId);//POR FIN CONSIGO EL OBJETO CLICKADO!!
    const indexFav = favoriteSeries.findIndex(
      (oneSerie) => oneSerie.mal_id === parseInt(idCardSelected)
    );
  
    if (indexFav === -1) {
      favoriteSeries.push(foundSerieId);
    }
  }

  renderSeries(favoriteSeries, containerFav);
  localStorage.setItem('series', JSON.stringify(favoriteSeries));
}

function removeFavorite(event) {
  card.classList.remove('favorite');
  const idCardSelected = card.id;
  removeSerie(idCardSelected);
  // const indexFav = favoriteSeries.findIndex(
  //   (oneSerie) => oneSerie.mal_id === parseInt(idCardSelected)
  // );
  // favoriteSeries.splice(indexFav, 1);
  // localStorage.setItem('series', JSON.stringify(favoriteSeries));
  // renderSeries(favoriteSeries, containerFav);
}


function getLocalSeries() {
  const seriesLocalStorage = JSON.parse(localStorage.getItem('series'));
  if (seriesLocalStorage) {
    favoriteSeries = seriesLocalStorage;
    renderSeries(favoriteSeries, containerFav);
  }
}

getLocalSeries();

function handleRemoveAll () {
  favoriteSeries = []; 
  localStorage.setItem('series', JSON.stringify(favoriteSeries));
  renderSeries(favoriteSeries, containerFav);
  renderSeries(seriesResult, containerRes);
}

btnRemoveAll.addEventListener('click', handleRemoveAll);

function handleReset (event) {
  event.preventDefault();
  handleRemoveAll();
  seriesResult = [];
  input.value = '';
  renderSeries(seriesResult,containerRes);

}

btnReset.addEventListener('click', handleReset);