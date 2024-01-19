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
  console.log(inputValue);
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((dataApi) => {
      seriesResult = dataApi.data;
      renderSeries(seriesResult, containerRes);
    });
}

btnSearch.addEventListener('click', handleSearchApi);

function renderSeries(arraySeries, container) {
container.innerHTML= '';  //esto tengo que hacerlo para que cuando llame a renderizar me vacíe el contenido primero, si no, se me acumulaban todas las búsquedas y las favoritas al llamar a render
  for (const serie of arraySeries) {
    const idCard = serie.mal_id;
    // console.log(serie);
    // console.log(idCard);
    const titleText = document.createTextNode(serie.title);
    let imageUrl = serie.images.jpg.image_url;
    const newImageUrl = 'https://placehold.co/210x295?text=Image';
    if (
      imageUrl ==='https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
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
    // img.setAttribute('alt', 'imagen anime');
    container.appendChild(li);
    li.appendChild(articleEl);
    articleEl.appendChild(img);
    title.appendChild(titleText);
    icon.setAttribute('class', 'fa-solid fa-circle-xmark js-btnRemove card__btn' );
    articleEl.setAttribute('class', 'js-article card');
    articleEl.setAttribute('id', idCard);
    articleEl.appendChild(title);
    if (container === containerFav) {
        articleEl.appendChild(icon);
    }
    container.appendChild(li);
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
  const idCardSelected = card.id;
  const foundSerieId = seriesResult.find((oneSerie) => 
    parseInt(idCardSelected) === oneSerie.mal_id);
   console.log(foundSerieId);//POR FIN CONSIGO EL OBJETO CLICKADO!!
    const indexFav = favoriteSeries.findIndex((oneSerie) => oneSerie.mal_id === parseInt(idCardSelected));
    if(indexFav === -1){
        favoriteSeries.push(foundSerieId);
    }
    console.log(favoriteSeries);
    renderSeries(favoriteSeries, containerFav);
    localStorage.setItem('series', JSON.stringify(favoriteSeries));
}
  
   
function getLocalSeries () {
    const seriesLocalStorage = JSON.parse(localStorage.getItem('series'));
    renderSeries(seriesLocalStorage, containerFav);
}

getLocalSeries();