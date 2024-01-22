function handleClickInResults(event) {
  card = event.currentTarget;
  if (card.classList.contains('favorite')) {
    removeFavorite();
  } else {
    addFavorite();
  }
}

function removeFavorite(event) {
  card.classList.remove('favorite');
  const idCardSelected = card.id;
  removeSerie(idCardSelected);
}

function addFavorite(event) {
  const liResult = card.parentElement;
  if (liResult.classList.contains('js-liResult')) {
    card.classList.add('favorite');
    const idCardSelected = card.id;
    const foundSerieId = seriesResult.find(
      (oneSerie) => parseInt(idCardSelected) === oneSerie.mal_id
    );
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
