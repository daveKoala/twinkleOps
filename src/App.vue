<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useKidStore } from './stores/kidStore'
import { onMounted } from 'vue'

const kidsStore = useKidStore()

onMounted(() => {
  // Fetch any parent added kids
  kidsStore.readFromLocalStorage()
})
</script>

<template>
  <v-app id="inspire">
    <router-view />
  </v-app>
</template>

<style scoped></style>
