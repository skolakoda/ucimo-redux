const {createStore} = Redux

const broj = document.getElementById('broj')
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')

/* FUNKCIJE */

const render = (broj, stanje) => {
  broj.innerText = stanje
}

const info = () => console.log('stanje promenjeno')

/*
REDUKTOR
  prima stanje i akciju, vraća novo stanje
  stanje je samo prost broj
*/

const brojac = (state = 0, action) => {
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

const store = createStore(brojac)
store.subscribe(() => render(broj, store.getState()))
store.subscribe(info)

/*
AKCIJE
  otpravljaju opis željene izmene skladištu, na događaj
*/

plus.addEventListener('click', () => store.dispatch({type: 'INCREMENT'}))

minus.addEventListener('click', () => store.dispatch({type: 'DECREMENT'}))

/* INIT */

render(broj, store.getState())
