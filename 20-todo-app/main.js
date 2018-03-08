/* global Redux */
const {createStore} = Redux
const $ = s => document.querySelector(s)

const pocetnoStanje = {
  todos: [],
  filter: 'sve'
}
let i = 0

/* REDUKTOR */

const reduktor = (stanje = pocetnoStanje, akcija) => {
  switch (akcija.type) {
  case 'DODAJ':
    const todo = {
      tekst: akcija.tekst,
      uradjen: false,
      id: i++
    }
    return {...stanje, todos: [...stanje.todos, todo]}
  case 'OBRNI_TODO':
    const todos = stanje.todos.map(todo => todo.id === akcija.id
      ? {...todo, uradjen: !todo.uradjen}
      : {...todo}
    )
    return {...stanje, todos}
  case 'PODESI_FILTER':
    return {...stanje, filter: akcija.filter}
  default: return stanje
  }
}

/* SKLADISTE */

const store = createStore(reduktor)
const dispatch = store.dispatch

/* RENDER */

const render = () => {
  $('#lista').innerHTML = ''
  const filter = store.getState().filter
  store.getState().todos
    .filter(todo => filter === 'sve' || todo.uradjen === filter)
    .map(todo => {
      const li = document.createElement('li')
      li.innerText = todo.tekst
      li.style.textDecoration = todo.uradjen ? 'line-through' : ''
      li.onclick = () => dispatch({
        type: 'OBRNI_TODO',
        id: todo.id
      })
      $('#lista').appendChild(li)
    })
}

store.subscribe(render)

/* AKCIJE */

const kreirajFilter = filter => ({
  type: 'PODESI_FILTER',
  filter
})

$('#dodaj').addEventListener('click', () => dispatch({
  type: 'DODAJ',
  tekst: $('#todo').value
}))

$('#sve').addEventListener('click', () => dispatch(kreirajFilter('sve')))

$('#uradjeno').addEventListener('click', () => dispatch(kreirajFilter(true)))

$('#aktivno').addEventListener('click', () => dispatch(kreirajFilter(false)))
