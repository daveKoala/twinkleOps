<script setup lang="ts">
import { useKidStore } from '@/stores/kidStore'

const kidStore = useKidStore()

const links = [
  { text: 'Home', to: 'home' },
  { text: 'Fairy Collection Request', to: 'messages' },
  { text: 'About', to: 'about' },
  { text: 'The Spa', to: 'spa' },
]
</script>

<template>
  <v-app-bar flat density="compact" image="./images/steampunk_app_bar.jpg">
    <v-btn
      v-for="link in links"
      :key="link.to"
      :text="link.text"
      variant="text"
      color="white"
      :to="{ name: link.to.toLowerCase() }"
    ></v-btn>

    <v-spacer></v-spacer>

    <v-btn variant="text" color="white" @click="kidStore.clearKids()">Clear data</v-btn>
  </v-app-bar>
</template>
