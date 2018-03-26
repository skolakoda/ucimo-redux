/* global Redux */
const {createStore} = Redux
const [prikaz, smanji, povecaj] = document.querySelectorAll('#prikaz, #smanji, #povecaj')

// funkcije
const render = (prikaz, stanje) => prikaz.innerHTML = stanje

// reduktor
const reduktor = (stanje = 0, akcija) => {
  if (akcija.type == 'POVECAJ') return stanje + 1
  if (akcija.type == 'SMANJI') return stanje - 1
  return stanje
}

// skladiste
const skladiste = createStore(reduktor)
skladiste.subscribe(() => render(prikaz, skladiste.getState()))

// akcije
povecaj.addEventListener('click', () => skladiste.dispatch({type: 'POVECAJ'}))
smanji.addEventListener('click', () => skladiste.dispatch({type: 'SMANJI'}))

// init
render(prikaz, skladiste.getState())
