const {createStore} = Redux
const $ = s => document.querySelector(s)
const lista = $('#lista')
let i = 0

/* REDUKTOR */

const pocetnoStanje = {
  todos: [],
  filter: 'sve'
}

const reduktor = (stanje = pocetnoStanje, akcija) => {
  switch (akcija.type) {
    case 'DODAJ':
      const todo = {
        tekst: $('#todo').value,
        uradjen: false,
        id: i++
      }
      return Object.assign({}, stanje, { todos: [...stanje.todos, todo] })
    case 'OBRNI_TODO':
      const todos = stanje.todos.map(todo => todo.id === akcija.id
        ? Object.assign({}, todo, {uradjen: !todo.uradjen})
        : Object.assign({}, todo)
      )
      return Object.assign({}, stanje, {todos})
    case 'POSTAVI_FILTER':
      return Object.assign({}, stanje, { filter: akcija.filter })
    default: return stanje
  }
}

const store = createStore(reduktor)
const dispatch = store.dispatch

/* RENDER */

const render = () => {
  lista.innerHTML = ''
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
      lista.appendChild(li)
    })
}

store.subscribe(render)

/* AKCIJE */

const kreirajFilter = filter => ({
  type: 'POSTAVI_FILTER',
  filter
})

$('#dugme').addEventListener('click', () =>
  dispatch({type: 'DODAJ'}))

$('#sve').addEventListener('click', () =>
  dispatch(kreirajFilter('sve')))

$('#uradjene').addEventListener('click', () =>
  dispatch(kreirajFilter(true)))

$('#aktivne').addEventListener('click', () =>
  dispatch(kreirajFilter(false)))
