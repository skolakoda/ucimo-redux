const {createStore} = Redux
const $ = s => document.querySelector(s)

const lista = $('#lista')
const todo = $('#todo')
const dugme = $('#dugme')

/* FUNKCIJE */

const render = (stanje) => {
  lista.innerHTML = ''
  stanje.todos.map(task => {
    const li = document.createElement('li')
    li.onclick = () => store.dispatch({type: 'OBRNI_TODO'})
    li.innerText = task.text
    lista.appendChild(li)
  })
}

/* REDUKTOR */

const pocetnoStanje = {
  todos: [],  // treba da bude lista objekata
  filter: 1
}

const reduktor = (stanje = pocetnoStanje, action) => {
  switch (action.type) {
    case 'DODAJ':
      const task = {
        text: todo.value,
        completed: false
      }
      return Object.assign({}, pocetnoStanje, { todos: [...stanje.todos, task] })
    case 'OBRNI_TODO':
      console.log('OBRNI_TODO');
      // implementirati completed: !completed
      return stanje
    default: return stanje
  }
}

/* SKLADIŠTE */

const store = createStore(reduktor)
store.subscribe(() => render(store.getState()))

/* AKCIJE */

dugme.addEventListener('click', () => store.dispatch({type: 'DODAJ'}))
