const assert = require('assert')
const functions = require('./custom-overlay')
const { generateLocations } = functions

const cases = [
  {
    input: 2,
    output: {
      count: 2
    }
  },
  {
    input: 100,
    output: {
      count: 100
    }
  }
]

cases.forEach(c => {
  const locations = generateLocations(c.input)
  assert(locations.length === c.output.count)
  // assert object props
  locations.forEach(location => {
    assert(typeof location.longitude === 'number')
    assert(typeof location.latitude === 'number')
    assert(typeof location.rotate === 'number')
    assert(Object.keys(location).length === 3)
  })
})
