/* global Redux, reduktor */
const {createStore} = Redux
const $ = s => document.querySelector(s)
const store = createStore(reduktor)
const dispatch = store.dispatch

/* AKCIJE */

const podesiFilter = filter => ({
  type: 'PODESI_FILTER',
  filter
})

const dodaj = () => ({
  type: 'DODAJ',
  tekst: $('#todo').value
})

const obrniTodo = todo => ({
  type: 'OBRNI_TODO',
  id: todo.id
})

/* FUNKCIJE */

const dodajElement = (todo) => {
  const li = document.createElement('li')
  li.innerText = todo.tekst
  li.style.textDecoration = todo.uradjen ? 'line-through' : ''
  li.onclick = () => dispatch(obrniTodo(todo))
  $('#lista').appendChild(li)
}

const render = () => {
  $('#lista').innerHTML = ''
  const {filter, todos} = store.getState()
  todos.filter(todo => filter === 'sve' || todo.uradjen === filter)
    .map(dodajElement)
}

store.subscribe(render)

/* EVENTS */

$('#dodaj').addEventListener('click', () => dispatch(dodaj()))

$('#sve').addEventListener('click', () => dispatch(podesiFilter('sve')))

$('#uradjeno').addEventListener('click', () => dispatch(podesiFilter(true)))

$('#aktivno').addEventListener('click', () => dispatch(podesiFilter(false)))
