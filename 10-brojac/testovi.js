expect (
  brojac(0, { type: 'INCREMENT'})
).toEqual(1)

expect (
  brojac(1, { type: 'INCREMENT'})
).toEqual(2)

expect (
  brojac(2, { type: 'DECREMENT'})
).toEqual(1)

expect (
  brojac(1, { type: 'DECREMENT'})
).toEqual(0)

expect (
  brojac(6, { type: 'NEPOSTOJCE'})
).toEqual(6)

expect (
  brojac(undefined, {})
).toEqual(0)

console.log('Testovi prolaze!')
