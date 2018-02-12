const generateLocations = (n = 100) => {
  return Array(n).fill(null).map(el => {
    return {
      latitude: (Math.random() * 90 * 2) - 90,
      longitude: (Math.random() * 180 * 2) - 180,
      rotation: Math.floor((Math.random() * 360))
    }
  })
}

module = module || {}

module.exports = {
  generateLocations
}