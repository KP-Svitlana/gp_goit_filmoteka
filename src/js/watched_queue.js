import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import { btnClick } from './js/watched_queue' закинути в library.js

// додати класи у btnWatched і btnQueue у library-section-films.html

// закинути у refs
//  btnWatched: document.querySelector('.btn__watched'),
//  movieLibrary: document.querySelector('.library-films'),
//  emptyTitle: document.querySelector('.library-empty__title'),
//  emptyImg: document.querySelector('.library-empty__img'),
//  btnQueue: document.querySelector('.btn__queue'),
//  btnRemoveMovie: document.querySelector(''),
//  btnRemoveQueue: document.querySelector(''),

export function btnClick() {
btnWatched.addEventListener('click', onWatchedBtnClick);
btnQueue.addEventListener('click', onQueueBtnClick);  
}

function onWatchedBtnClick() {
    try {
        let watchedMovies = localStorage.getItem(key);
        if (watchedMovies.length >= 1) {
            watchedMovies = JSON.parse(watchedMovies);
            renderWatchedFilmCard(watchedMovies);
          } else {
            emptyTitle.classList.remove('is-hidden');
            emptyImg.classList.remove('is-hidden');
            Notify.info(
                `Your film list is empty`
            );
        }
    } catch (error) {
        console.log(error.message);
    }
    return;
};
// Queue

function onQueueBtnClick() {
    try {
        let queueMovie = localStorage.getItem(key);
        if (queueMovie.length >= 1) {
            queueMovie = JSON.parse(queueMovie);
            renderWatchedFilmCard(queueMovie);
          } else {
            emptyTitle.classList.remove('is-hidden');
            emptyImg.classList.remove('is-hidden');
            Notiflix.Notify.info(
               `Your film list is empty`
    );
        }
    } catch (error) {
        console.log(error.message);
    }
    return;
};

function renderWatchedFilmCard(key) {
  const markup = key
    .map(({ id, poster_path, title, release_date, genre_ids }) => {
      let filmGenre = '';
      if (genre_ids) {
        let filmGenreId = genresId
          .filter(({ id }) => genre_ids.includes(id))
          .map(({ name }) => name);

        if (filmGenreId.length >= 4) {
          filmGenre = `${filmGenreId.slice(0, 2).join(', ')},  Others`;
        } else {
          filmGenre = filmGenreId.join(', ');
        }
      }

      const img = `<img   class='film__img' alt= '${title}' width='100%'
      src='https://image.tmdb.org/t/p/original${poster_path}'/>`;

      return `<li class="film__item" data-id=${id}>
                  ${poster_path ? img : '<p>Poster is not available.</p>'}
                  <h2 class="films__title">${title}</h2>
                  <p class="films__genres">${filmGenre || 'Not available'
        }<span>|${(release_date || 'Not available').slice(
          0,
          4
        )}</span></p>
              </li>`;
    })
    .join('');
  movieLibrary.innerHTML = markup;
};

btnRemoveMovie.addEventListener('click', movieRemovalLogic);
btnREmoveQueue.addEventListener('click', movieRemovalLogic);
