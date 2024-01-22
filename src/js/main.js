'use strict';

import './variables.js';
import './handleSearchApi.js';
import './handleClickInResults.js';
import './handleRemoveFavorite.js';


btnSearch.addEventListener('click', handleSearchApi);

function getLocalSeries() {
  const seriesLocalStorage = JSON.parse(localStorage.getItem('series'));
  if (seriesLocalStorage) {
    favoriteSeries = seriesLocalStorage;
    renderSeries(favoriteSeries, containerFav);
  }
}

getLocalSeries();


function handleRemoveAll() {
  favoriteSeries = [];
  localStorage.setItem('series', JSON.stringify(favoriteSeries));
  renderSeries(favoriteSeries, containerFav);
  renderSeries(seriesResult, containerRes);
}

btnRemoveAll.addEventListener('click', handleRemoveAll);

function handleReset(event) {
  event.preventDefault();
  handleRemoveAll();
  seriesResult = [];
  input.value = '';
  renderSeries(seriesResult, containerRes);
}

btnReset.addEventListener('click', handleReset);
