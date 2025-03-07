<script lang="ts" setup>
import type { Fairy } from '@/types'

const props = defineProps<{ fairy: Fairy }>()
</script>

<template>
  <v-card title="Assigned Fairy" variant="outlined" class="border-warning" border="lg">
    <v-img
      :src="`images/${fairy.avatar}`"
      height="200px"
      :alt="`Picture of a tooth fairy called ${fairy.name}`"
    />
    <v-card-item>
      <div class="text-h6 mb-1"><span class="font-weight-bold">Fairy: </span>{{ fairy.name }}</div>
      <div class="text-h6 mb-1">
        <span class="font-weight-bold">Notes: </span>
        <div class="text-h6 mb-1">{{ fairy.description }}</div>
      </div>
    </v-card-item>
  </v-card>
</template>
