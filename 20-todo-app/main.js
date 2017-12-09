const {createStore} = Redux
const $ = s => document.querySelector(s)

const lista = $('#lista')
const todo = $('#todo')
const dugme = $('#dugme')

/* FUNKCIJE */

const render = (stanje) => {
  lista.innerHTML = ''
  stanje.todos.map(txt => {
    const li = document.createElement('li')
    li.innerText = txt
    lista.appendChild(li)
  })
}

/* REDUKTOR */

const pocetnoStanje = {
  todos: []
}

const reduktor = (stanje = pocetnoStanje, action) => {
  switch (action.type) {
    case 'DODAJ':
      return Object.assign({}, pocetnoStanje, { todos: [...stanje.todos, todo.value] })
    default: return stanje
  }
}

/* SKLADIŠTE */

const store = createStore(reduktor)
store.subscribe(() => render(store.getState()))

/* AKCIJE */

dugme.addEventListener('click', () => store.dispatch({type: 'DODAJ'}))
