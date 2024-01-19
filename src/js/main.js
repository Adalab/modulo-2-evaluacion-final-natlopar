'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btnSearch');
const containerFav = document.querySelector('.js-containerFav');
const containerRes = document.querySelector('.js-containerRes');

let seriesResult = []; // array.data, contiene los arrays
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
  for (const serie of arraySeries) {
    const titleText = document.createTextNode(serie.title);
    let imageUrl = serie.images.jpg.image_url;
    const newImageUrl = 'https://placehold.co/210x295?text=No\Image\Found';
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
    img.setAttribute('src', imageUrl);
    img.setAttribute('class', 'card__img');
    img.setAttribute('alt', 'imagen anime');
    container.appendChild(li);
    li.appendChild(articleEl);
    articleEl.appendChild(icon);
    articleEl.appendChild(img);
    title.appendChild(titleText);
    icon.setAttribute(
      'class',
      'fa-solid fa-circle-xmark js-btnRemove card__btn'
    );
    icon.setAttribute('id', serie.mal_id);
    articleEl.setAttribute('class', 'js-article card');
    articleEl.setAttribute('id', serie.mal_id);
    articleEl.appendChild(title);
    if (container === containerRes) {
      li.setAttribute('class', 'js-liResult');
      articleEl.removeChild(icon);
    }
    container.appendChild(li);
    listenerSelectFavorites();
    listenerRemoveFavorites();
  }

  function listenerRemoveFavorites() {
    const btnRemove = document.querySelectorAll('.js-btnRemove');
    for (const button of btnRemove) {
      button.addEventListener('click', handleRemoveFavorite);
    }
  }
}

function listenerSelectFavorites() {
  const articles = document.querySelectorAll('.js-article');
  for (const article of articles) {
    article.addEventListener('click', handleAddFavorite);
  }
}

function handleAddFavorite(event) {
  const card = event.currentTarget;
  const liResult = card.parentElement;
  card.classList.add('favorite');
  console.log(liResult);
  if (liResult.classList.contains('js-liResult')) {
    //quiero que solo lo haga en las fotos de resultados, no en favoritos
    
    const idCardSelected = card.id;
    const foundSerieId = seriesResult.find(
      (oneSerie) => parseInt(idCardSelected) === oneSerie.mal_id
    );
    //    console.log(foundSerieId);//POR FIN CONSIGO EL OBJETO CLICKADO!!
    const indexFav = favoriteSeries.findIndex(
      (oneSerie) => oneSerie.mal_id === parseInt(idCardSelected)
    );
    if (indexFav === -1) {
      favoriteSeries.push(foundSerieId);
    }
    renderSeries(favoriteSeries, containerFav);
    localStorage.setItem('series', JSON.stringify(favoriteSeries));
  }
}

function getLocalSeries() {
  const seriesLocalStorage = JSON.parse(localStorage.getItem('series'));
  if (seriesLocalStorage) {
    renderSeries(seriesLocalStorage, containerFav);
  }
}

getLocalSeries();

function handleRemoveFavorite(event) {
  const btnClick = event.currentTarget;
  const articleClick = btnClick.parentElement;
  console.log(articleClick);
  const idFavoriteClick = btnClick.id;
  console.log(parseInt(idFavoriteClick));
  const indexRemove = favoriteSeries.findIndex(
    (serie) => serie.mal_id === parseInt(idFavoriteClick)
  );
  favoriteSeries.splice(indexRemove, 1);
  localStorage.setItem('series',JSON.stringify(favoriteSeries));
  renderSeries(favoriteSeries, containerFav);

  //qUITAR LA CLASE EN RESULTS
  // const indexResult = seriesResult.findIndex(
  //   (serie) => serie.mal_id === parseInt(idFavoriteClick));
  
  //   if(serie.mal_id === parseInt(idFavoriteClick)) {
    // }
    for(const serie of seriesResult){
    const articlesCheck = document.querySelectorAll('.favorite')
    for(const articleCheck of articlesCheck){
     if(serie.mal_id === parseInt(idFavoriteClick)){
      articleCheck.classList.remove('favorite');
     }
    }
      //me borra todos, tengo que hacer que me borre solo el que tenga esa id//
      
    }
  }
  
  // console.log(newResultsSeries);
  
    // card.classList.add('favorite');


