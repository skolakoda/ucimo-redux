const {createStore} = Redux
const $ = s => document.querySelector(s)

const lista = $('#lista')
const todoInput = $('#todo')
const dugme = $('#dugme')

let i = 0

/* FUNKCIJE */

const render = () => {
  lista.innerHTML = ''
  store.getState().todos.map(todo => {
    const li = document.createElement('li')
    li.innerText = todo.tekst
    li.style.textDecoration = todo.uradjen ? 'line-through' : ''
    li.onclick = () => store.dispatch({
      type: 'OBRNI_TODO',
      id: todo.id
    })
    lista.appendChild(li)
  })
}

/* REDUKTOR */

const pocetnoStanje = {
  todos: [],  // treba da bude lista objekata
  filter: 1
}

const reduktor = (stanje = pocetnoStanje, akcija) => {
  switch (akcija.type) {
    case 'DODAJ':
      const task = {
        tekst: todoInput.value,
        uradjen: false,
        id: i++
      }
      return Object.assign({}, stanje, { todos: [...stanje.todos, task] })
    case 'OBRNI_TODO':
      const todos = stanje.todos.map(todo => todo.id === akcija.id
        ? Object.assign({}, todo, {uradjen: !todo.uradjen})
        : Object.assign({}, todo)
      )
      return Object.assign({}, stanje, {todos})
    default: return stanje
  }
}

/* SKLADIŠTE */

const store = createStore(reduktor)
store.subscribe(render)

/* AKCIJE */

dugme.addEventListener('click', () => store.dispatch({type: 'DODAJ'}))
