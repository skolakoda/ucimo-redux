expect (
  reduktor(0, { type: 'INCREMENT'})
).toEqual(1)

expect (
  reduktor(1, { type: 'INCREMENT'})
).toEqual(2)

expect (
  reduktor(2, { type: 'DECREMENT'})
).toEqual(1)

expect (
  reduktor(1, { type: 'DECREMENT'})
).toEqual(0)

expect (
  reduktor(undefined, {})
).toEqual(0)

console.log('Testovi prolaze!')
