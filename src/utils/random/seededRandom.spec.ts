import { describe, it, expect } from 'vitest'
import { seededRandom } from './index' // Adjust the import to your file structure

describe('seededRandom', () => {
  it('should generate a deterministic sequence for the same seed', () => {
    const rng1 = seededRandom(42)
    const rng2 = seededRandom(42)

    expect(rng1()).toBe(rng2()) // First number should match
    expect(rng1()).toBe(rng2()) // Second number should match
    expect(rng1()).toBe(rng2()) // Third number should match
  })

  it('should generate different sequences for different seeds', () => {
    const rng1 = seededRandom(42)
    const rng2 = seededRandom(69)

    expect(rng1()).not.toBe(rng2()) // First number should differ
    expect(rng1()).not.toBe(rng2()) // Second number should differ
  })
})
