/* global Redux */
const {combineReducers} = Redux

let i = 0

const todos = (stanje = [], akcija) => {
  switch (akcija.type) {
    case 'DODAJ':
      const todo = {
        tekst: akcija.tekst,
        uradjen: false,
        id: i++
      }
      return [...stanje, todo]
    case 'OBRNI_TODO':
      return stanje.map(todo => todo.id === akcija.id
        ? {...todo, uradjen: !todo.uradjen}
        : {...todo}
      )
    default: return stanje
  }
}

const filter = (stanje = 'sve', akcija) => {
  if (akcija.type === 'PODESI_FILTER')
    return akcija.filter
  return stanje
}

const reduktor  = combineReducers({ // eslint-disable-line no-unused-vars
  todos,
  filter
})
