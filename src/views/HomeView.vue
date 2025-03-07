<script setup lang="ts">
import KidListItem from '@/components/kidListItem.vue'
import { shuffleArrayWithSeed } from '@/utils/random'
import kidDetails from '@/components/kidDetails.vue'
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useKidStore } from '@/stores/kidStore'
import { ref, computed, onMounted } from 'vue'
import defaultKids from '@/data/kids'
import type { Kid } from '@/types'

const kidsStore = useKidStore()

const activeKidId = ref<string | number | null>(null)

const activeFab = ref({ color: 'success', icon: 'mdi-arrow-up-circle' })

const detailsRef = ref()

const listRef = ref()

const kidRoot = computed((): Kid[] => [...defaultKids, ...kidsStore.addedKids])

const kids = computed((): Kid[] => {
  const date = new Date()
  const rand = date.getDate()
  return shuffleArrayWithSeed(kidRoot.value, rand)
})

const isActive = (kid: Kid) => {
  return kid.id === activeKidId.value || false
}

const getActiveKid = computed((): Kid | null => {
  if (activeKidId.value === null) {
    return null
  } else {
    return findKidById(activeKidId.value)
  }
})

const findKidById = (id: string | number): Kid | null => {
  // Return null if no match
  return kids.value.find((kid) => kid.id === id) || null
}

const catchKidSelected = (kid: Kid) => {
  if (kid && kid.id) {
    activeKidId.value = kid.id
  } else {
    activeKidId.value = ''
  }

  scrollToDetails()
}

const scrollToDetails = () => {
  // Scroll to the exposed section in the child component
  console.log('scroll')
  detailsRef.value?.detailsSection?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const scrollToTop = () => {
  console.log('top..')
  listRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

onMounted(() => {
  if (kids.value[0].id) {
    activeKidId.value = kids.value[0].id
  }
})
</script>

<template>
  <main>
    <div ref="listRef"></div>
    <BasicLayout>
      <template v-slot:sidebar>
        <div class="scrollable-list">
          <v-list lines="three">
            <KidListItem
              v-for="kid in kids"
              :key="kid.id"
              :kid="kid"
              :isActive="isActive(kid)"
              @kidselected="catchKidSelected"
            />
          </v-list>
        </div>
      </template>
      <v-fab
        :key="activeFab.icon"
        :color="activeFab.color"
        :icon="activeFab.icon"
        location="bottom end"
        size="64"
        app
        appear
        class="mx-1 d-md-none"
        @click="scrollToTop()"
      ></v-fab>
      <kidDetails :kid="getActiveKid" v-if="getActiveKid" ref="detailsRef" />
    </BasicLayout>
  </main>
</template>

<style scoped>
.scrollable-list {
  max-height: calc(100vh - 150px); /* Adjust 200px based on header and footer height */
  overflow-y: scroll;
  padding: 0px 8px;

  /* box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); */
}
</style>
