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

function renderSeries(arraySeries, container) {
  container.innerHTML = '';
  const seriesLocalStorage = JSON.parse(localStorage.getItem('series'));
  for (const serie of arraySeries) {
    const titleText = document.createTextNode(serie.title);
    let imageUrl = serie.images.jpg.image_url;
    const newImageUrl = 'https://placehold.co/210x295?text=NoImageFound';
    if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      imageUrl = newImageUrl;
    }
    const li = document.createElement('li');
    const articleEl = document.createElement('article');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const icon = document.createElement('i');

    articleEl.appendChild(icon);
    icon.setAttribute('class',
      'fa-solid fa-circle-xmark js-btnRemove card__btn');
    
    img.setAttribute('src', imageUrl);
    img.setAttribute('class', 'card__img');
    img.setAttribute('alt', 'imagen anime');
    articleEl.appendChild(img);

    container.appendChild(li);
    li.setAttribute('class', 'list');
    li.appendChild(articleEl);

    title.setAttribute('class', 'card__title');
    title.appendChild(titleText);

    articleEl.setAttribute('id', serie.mal_id);
    articleEl.setAttribute('class', 'js-article card');
    articleEl.appendChild(title);
    
    if (container === containerRes) {
      li.classList.add('js-liResult');
      articleEl.removeChild(icon);
      if (seriesLocalStorage) {
        for (const serie of seriesLocalStorage) {
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
