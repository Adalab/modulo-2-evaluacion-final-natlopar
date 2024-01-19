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
  for (const serie of arraySeries) {
    const idCard = serie.mal_id;
    // console.log(serie);
    // console.log(idCard);
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
    container.appendChild(li);
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
  const idCardSelected = card.id;
  const foundSerieId = seriesResult.find((oneSerie) => 
    parseInt(idCardSelected) === oneSerie.mal_id
    );
   console.log(foundSerieId);//POR FIN CONSIGO EL OBJETO CLICKADO!!
    favoriteSeries.push(foundSerieId);
    console.log(favoriteSeries);

    ///si ya está en el array, no añadirlo, o sea antes del push
    renderSeries(favoriteSeries, containerFav);
}


