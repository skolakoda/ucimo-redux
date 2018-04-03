/* global Redux */
const {combineReducers} = Redux

let i = 0

const reduktorNiza = (stanje = [], akcija) => {
  switch (akcija.type) {
  case 'DODAJ':
    const todo = {
      tekst: akcija.tekst,
      uradjen: false,
      id: i++
    }
    return [...stanje, todo]
  case 'OBRNI_TODO':
    const todos = stanje.map(todo => todo.id === akcija.id
      ? {...todo, uradjen: !todo.uradjen}
      : {...todo}
    )
    return todos
  default: return stanje
  }
}

const reduktorFiltera = (stanje = 'sve', akcija) => {
  if (akcija.type === 'PODESI_FILTER')
    return akcija.filter
  return stanje
}

const reduktor  = combineReducers({todos: reduktorNiza, filter: reduktorFiltera}) // eslint-disable-line no-unused-vars
