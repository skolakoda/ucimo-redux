const {createStore} = Redux
const prikaz = document.getElementById('prikaz')
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')

/* FUNKCIJE */

const render = (prikaz, stanje) => prikaz.innerText = stanje

/*
REDUKTOR
  prima stanje i akciju, vraća novo stanje
*/

const reduktor = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    default: return state
  }
}

/*
SKLADIŠTE
  registruje povratne funkcije, koje poziva kad se stanje promeni
*/

const store = createStore(reduktor)
store.subscribe(() => render(prikaz, store.getState()))

/*
AKCIJE
  otpravljaju opis željene izmene skladištu, na događaj
*/

plus.addEventListener('click', () => store.dispatch({type: 'INCREMENT'}))
minus.addEventListener('click', () => store.dispatch({type: 'DECREMENT'}))

/* INIT */

render(prikaz, store.getState())
