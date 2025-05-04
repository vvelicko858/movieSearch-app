const apikey = '372a4f7'
const siteUrl = `http://www.omdbapi.com/?apikey=${apikey}`
let searchLast = ' '

const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (!json || !json.Search) throw Error('Сервер вернул неправильный ответ')
      return json.Search
    })

inputSearch.addEventListener('keyup', (e) => {
  const searchString = e.target.value

  delay(() => {
    if (!triggerMode) clearMoviesMarcup()

    if (searchString && searchString.length > 3 && searchString !== searchLast) {
      searchLast = searchString.trim()
      getData(`${siteUrl}&s=${searchLast}`)
        .then((movies) => movies.forEach((movie) => addMovieTolist(movie)))
        .catch((err) => {
          console.log(err)
          alert('Неверное название фильма')
        })
    }
  }, 2300)
})
