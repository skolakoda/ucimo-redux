const {createStore} = Redux

/* FUNKCIJE */

const render = stanje => {
  document.body.innerHTML = `<h1>${stanje}</h1>`
}

const info = () => console.log('stanje promenjeno')

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
poziva povratne funkcije kad se stanje promeni
*/

const store = createStore(reduktor)
store.subscribe(() => render(store.getState()))
store.subscribe(info)

/*
AKCIJE
otpravljaju opis željene promene skladištu
*/

document.addEventListener('click', () => store.dispatch({ type: 'INCREMENT'}))

document.addEventListener('contextmenu', () => store.dispatch({ type: 'DECREMENT' }))

/* INIT */

render(store.getState())
