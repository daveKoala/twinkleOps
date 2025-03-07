import { dropDatabase } from '@/utils/indexDB'
import type { Kid, Kids } from '@/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import config from '@/config'

export const useKidStore = defineStore('kidStore', () => {
  const addedKids = ref<Kids>([]) // State

  const addOrUpdateKid = (kid: Kid) => {
    const existingKidIndex = addedKids.value.findIndex((k) => k.id === kid.id)

    if (existingKidIndex !== -1) {
      // Update the existing kid
      addedKids.value[existingKidIndex] = { ...addedKids.value[existingKidIndex], ...kid }
      console.log(`Kid with ID ${kid.id} updated.`)
    } else {
      // Add a new kid
      addedKids.value.push(kid)
      console.log(`New kid with ID ${kid.id} added.`)
    }

    writeToLocalStorage() // Save changes to local storage
  }

  const removeKid = (kid: Kid) => {
    addedKids.value = addedKids.value.filter((item) => item.id != kid.id)
    writeToLocalStorage()
  }

  const clearKids = () => {
    addedKids.value = []
    writeToLocalStorage()
    dropDatabase()
  }

  const readFromLocalStorage = () => {
    const kids = JSON.parse(localStorage.getItem('kids') || '[]') as Kids
    addedKids.value = kids
  }

  const writeToLocalStorage = () => {
    localStorage.setItem('kids', JSON.stringify(addedKids.value))
  }

  const customKids = computed(() => {
    return addedKids.value.filter((kid: Kid) => kid.id.toString().startsWith(config.customIdPrefix))
  })

  return {
    readFromLocalStorage,
    addOrUpdateKid,
    customKids,
    addedKids,
    removeKid,
    clearKids,
  }
})
