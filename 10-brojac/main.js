/* global Redux */
const {createStore} = Redux
const [prikaz, smanji, povecaj] = document.querySelectorAll('#prikaz, #smanji, #povecaj')

// funkcije
const render = (prikaz, stanje) => prikaz.innerHTML = stanje

// reduktor
const reducer = (stanje = 0, action) => {
  if (action.type == 'POVECAJ') return stanje + 1
  if (action.type == 'SMANJI') return stanje - 1
  return stanje
}

// skladiste
const store = createStore(reducer)
store.subscribe(() => render(prikaz, store.getState()))

// otpremanje akcija
povecaj.addEventListener('click', () => store.dispatch({type: 'POVECAJ'}))
smanji.addEventListener('click', () => store.dispatch({type: 'SMANJI'}))

// init
render(prikaz, store.getState())
