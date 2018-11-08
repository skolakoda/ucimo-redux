/* TVORCI AKCIJA (action creators) */

// stara sintaksa

function ulogovati() {
  return {type: 'ULOGOVATI'}
}

// nova sintaksa

const izlogovati = () => {type: 'IZLOGOVATI'}

const dodajFilm = payload => ({type: 'DODAJ_FILM', payload})

/* OTPRAVLJAMO AKCIJE */

store.dispatch(ulogovati())
store.dispatch({type: 'ULOGOVATI'})

store.dispatch(dodajFilm('Matrix'))
store.dispatch({type: 'DODAJ_FILM', payload: 'Matrix'})
