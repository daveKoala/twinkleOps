import { describe, expect, it } from 'vitest'
import { shuffleArrayWithSeed } from './index' // Adjust the import to your file structure

describe('shuffleArrayWithSeed', () => {
  it('should return the same shuffled order for the same seed', () => {
    const inputArray = [1, 2, 3, 4, 5]

    const shuffled1 = shuffleArrayWithSeed(inputArray, 42)
    const shuffled2 = shuffleArrayWithSeed(inputArray, 42)

    expect(shuffled1).toEqual(shuffled2) // Should be identical
  })

  it('should return different shuffled orders for different seeds', () => {
    const inputArray = [1, 2, 3, 4, 5]

    const shuffled1 = shuffleArrayWithSeed(inputArray, 42)
    const shuffled2 = shuffleArrayWithSeed(inputArray, 69)

    expect(shuffled1).not.toEqual(shuffled2) // Different seed = different order
  })

  it('should not modify the original array', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const copy = [...inputArray]

    shuffleArrayWithSeed(inputArray, 42) // Call function but don't store result

    expect(inputArray).toEqual(copy) // Original array must remain unchanged
  })

  it('should return an array of the same length', () => {
    const inputArray = [1, 2, 3, 4, 5]

    const shuffled = shuffleArrayWithSeed(inputArray, 42)

    expect(shuffled.length).toBe(inputArray.length)
  })

  it('should contain the same elements after shuffling', () => {
    const inputArray = [1, 2, 3, 4, 5]

    const shuffled = shuffleArrayWithSeed(inputArray, 42)

    expect(new Set(shuffled)).toEqual(new Set(inputArray)) // Same elements, different order
  })
})
