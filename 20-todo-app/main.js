/* global Redux, reduktor */
const {createStore} = Redux
const $ = s => document.querySelector(s)
const store = createStore(reduktor)
const dispatch = store.dispatch

/* TVORCI AKCIJA */

const podesiFilter = filter => ({
  type: 'PODESI_FILTER',
  filter
})

const dodaj = tekst => ({
  type: 'DODAJ',
  tekst
})

const obrniTodo = id => ({
  type: 'OBRNI_TODO',
  id
})

/* FUNKCIJE */

const dodajElement = (todo) => {
  const li = document.createElement('li')
  li.innerText = todo.tekst
  li.style.textDecoration = todo.uradjen ? 'line-through' : ''
  li.onclick = () => dispatch(obrniTodo(todo.id))
  $('#lista').appendChild(li)
}

const render = () => {
  $('#lista').innerHTML = ''
  const {filter, todos} = store.getState()
  todos.filter(todo => filter === 'sve' || todo.uradjen === filter)
    .map(dodajElement)
}

store.subscribe(render)

/* OTPRAVNICI AKCIJA */

$('#dodaj').addEventListener('click', () => dispatch(dodaj($('#todo').value)))

$('#sve').addEventListener('click', () => dispatch(podesiFilter('sve')))

$('#uradjeno').addEventListener('click', () => dispatch(podesiFilter(true)))

$('#aktivno').addEventListener('click', () => dispatch(podesiFilter(false)))
