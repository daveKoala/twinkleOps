export const seededRandom = (seed: number) => {
  const m = 2 ** 32
  const a = 1664525
  const c = 1013904223
  let state = seed

  return function () {
    state = (a * state + c) % m
    return state / m
  }
}

export const shuffleArrayWithSeed = <T>(array: T[], seed: number): T[] => {
  const rng = seededRandom(seed)
  return array
    .map((item) => ({ item, random: rng() }))
    .sort((a, b) => a.random - b.random)
    .map((obj) => obj.item)
}
