let moviesList = null
let inputSearch = null
let triggerMode = false

const createStyle = () => {
  const headStyle = document.createElement('style')
  document.head.appendChild(headStyle)

  headStyle.innerHTML = `
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #0d0d0d;
    color: #f5f5f5;
  }
  .container {
    padding: 40px 20px;
    max-width: 1280px;
    margin: auto;
  }
  h1 {
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
    color: #ffcc00;
    text-shadow: 0 0 10px rgba(255, 204, 0, 0.4);
  }
  .search {
    margin-bottom: 40px;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(255, 204, 0, 0.1);
  }
  .search__lable-input {
    display: block;
    margin-bottom: 10px;
    font-size: 1rem;
    color: #bbbbbb;
  }
  .search__input {
    padding: 12px 20px;
    max-width: 100%;
    width: 100%;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    background-color: #2a2a2a;
    color: #ffffff;
    transition: box-shadow 0.3s ease;
    outline: none;
  }
  .search__input:focus {
    box-shadow: 0 0 5px 2px #ffcc00;
  }
  .search__checkbox {
    margin-top: 10px;
    transform: scale(1.2);
    accent-color: #ffcc00;
  }
  .search__label-checkbox {
    font-size: 0.9rem;
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    color: #aaaaaa;
  }
  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 24px;
  }
  .movie {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #1e1e1e, #111);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }
  .movie:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 25px rgba(255, 204, 0, 0.3);
  }
  .movie__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  `
}

const createElement = (type, attrs, container = null, pos, evt = null, handler = null) => {
  const el = document.createElement(type)

  for (let key in attrs) {
    if (key !== 'innerHTML') {
      el.setAttribute(key, attrs[key])
    } else {
      el.innerHTML = attrs[key]
    }
  }

  if (container && !pos) container.append(el)
  if (container && pos) container.prepend(el)

  if (evt && handler) el.addEventListener(evt, handler)

  return el
}

const triggerModeHandler = () => (triggerMode = !triggerMode)

const createSearchBox = (container) => {
  createElement('h1', { innerHTML: 'Приложение для поиска фильмов' }, container)

  const searchBox = createElement('div', { class: 'search' }, container)

  createElement(
    'label',
    {
      class: 'search__lable-input',
      for: 'search',
      innerHTML: 'Поиск фильмов'
    },
    searchBox
  )

  inputSearch = createElement(
    'input',
    {
      class: 'search__input',
      id: 'search',
      type: 'text',
      placeholder: 'Введите текст...'
    },
    searchBox
  )

  createElement(
    'input',
    {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox'
    },
    searchBox,
    false,
    'click',
    triggerModeHandler
  )

  createElement(
    'label',
    {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerHTML: 'Добавлять фильмы к существующим'
    },
    searchBox
  )
}

const createMarkup = () => {
  const container = createElement('div', { class: 'container' }, document.body, true)
  createSearchBox(container)
  moviesList = createElement('div', { class: 'movies' }, container)
}

const delay = (() => {
  let timer = null

  return (cb, ms) => {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(cb, ms)
  }
})()

const addMovieTolist = (movie) => {
  const item = createElement('div', { class: 'movie' }, moviesList)
  const img = createElement('img', { class: 'movie__img', src: movie.Poster }, item)

  if (movie.Poster === 'N/A') {
    item.remove()
  }
  img.onerror = () => {
    item.remove()
  }
}

const clearMoviesMarcup = () => moviesList && (moviesList.innerHTML = ' ')

createMarkup()
createStyle()
