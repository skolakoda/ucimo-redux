/* global Redux */
const {combineReducers} = Redux

let i = 0

const reduktorNiza = (stanje = [], akcija) => {
  switch (akcija.type) {
  case 'DODAJ':
    const el = {
      tekst: akcija.tekst,
      uradjen: false,
      id: i++
    }
    return [...stanje, el]
  case 'OBRNI_TODO':
    return stanje.map(el => el.id === akcija.id
      ? {...el, uradjen: !el.uradjen}
      : {...el}
    )
  default: return stanje
  }
}

const reduktorFiltera = (stanje = 'sve', akcija) => {
  if (akcija.type === 'PODESI_FILTER')
    return akcija.filter
  return stanje
}

const reduktor  = combineReducers({todos: reduktorNiza, filter: reduktorFiltera}) // eslint-disable-line no-unused-vars
