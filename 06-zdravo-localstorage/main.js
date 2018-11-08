const ulogovan = document.getElementById('ulogovan')
const filmovi = document.getElementById('filmovi')

const inicijalnoStanje = {
  ulogovan: false,
  filmovi: ["Roki", "Rambo", "Top gan"]
}

const sacuvanoStanje = localStorage.getItem('reduxState') 
  ? JSON.parse(localStorage.getItem('reduxState')) 
  : inicijalnoStanje

function reducer(state = sacuvanoStanje, action) {
  if (action.type == 'ULOGOVATI') {
    return {...state, ulogovan: true}
  }
  if (action.type == 'IZLOGOVATI') {
    return {...state, ulogovan: false}
  }
  if (action.type == 'DODAJ_FILM') {
    const noviNiz = [...state.filmovi]
    noviNiz.push(action.payload)
    return {...state, filmovi: noviNiz}
  }
  return state
}

const store = Redux.createStore(reducer)

store.subscribe(() => {
  ulogovan.innerHTML = store.getState().ulogovan
  filmovi.innerHTML = store.getState().filmovi
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

store.dispatch({type: 'ULOGOVATI'})

// probati iz konzole
// store.dispatch({type: 'DODAJ_FILM', payload: 'Prohujalo sa vihorom'})
// store.dispatch({type: 'IZLOGOVATI'})