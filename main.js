const { createStore } = Redux

const reduktor = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    default: return state
  }
}

const render = () => {
  document.body.innerHTML = `<h1>${store.getState()}</h1>`
}

const info = () => console.log('stanje promenjeno')

const store = createStore(reduktor)
store.subscribe(render) // izvršava kad god se stanje promeni
store.subscribe(info)

render()

/** Emitovanje akcija **/

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT'})
})

document.addEventListener('contextmenu', () => {
  store.dispatch({ type: 'DECREMENT' });
});
