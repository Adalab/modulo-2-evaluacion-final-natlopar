function handleRemoveFavorite(event) {
  const btnClick = event.currentTarget;
  const articleClick = btnClick.parentElement;
  const idFavoriteClick = articleClick.id;
  removeSerie(idFavoriteClick);
  changeStyle(articleClick);
}

function changeStyle(articleClick) {
  const articles = document.querySelectorAll('.js-article');
  for (const article of articles) {
    const idArticle = article.id;
    if (articleClick.id === idArticle) {
      article.classList.remove('favorite');
    }
  }
}

function removeSerie (idClicked) {
    const indexSerie = favoriteSeries.findIndex(
        (oneSerie) => oneSerie.mal_id === parseInt(idClicked));
    favoriteSeries.splice(indexSerie, 1);
    localStorage.setItem('series', JSON.stringify(favoriteSeries));
    renderSeries(favoriteSeries, containerFav);
}