<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { resolveImageUrl } from '@/utils/imageUtils'
import { type Kid, type Status } from '@/types'
import config from '@/config'

const props = defineProps<{ kid: Kid; isActive: boolean }>()

const kid = ref({ ...props.kid })

const emit = defineEmits<{
  (event: 'kidselected', value: Kid): void
}>()

const imageUrl = ref('')

let timer: ReturnType<typeof setTimeout>

const toothColour = (kid: Kid) => {
  return kid.status == 'Visited' ? 'green-lighten-2' : 'red-darken-2'
}

const onKidClick = (kid: Kid) => {
  emit('kidselected', kid)
}

const updateImageUrl = async () => {
  imageUrl.value = await resolveImageUrl(props.kid)
}

onMounted(() => {
  updateImageUrl()

  const status: Status = 'Pending'

  if (kid.value.status === status && !kid.value.id.startsWith(config.customIdPrefix)) {
    // This line generates a random delay in milliseconds, with the range being between minRandomTime seconds and maxRandomTime minutes
    const randomDelay =
      Math.random() * (config.maxRandomTime * 60 * 1000 - 30 * 1000) + config.minRandomTime * 1000

    timer = setTimeout(() => {
      kid.value.status = 'Visited'
      kid.value.moneyLeft = true
    }, randomDelay)
  }
})

onUnmounted(() => {
  clearTimeout(timer)
})

watch(
  () => props.kid.avatar,
  () => {
    updateImageUrl()
  },
  { immediate: true },
)
</script>

<template>
  <v-list-item
    active-class="text-pink-darken-2"
    :prepend-avatar="imageUrl"
    @click="onKidClick(kid)"
    :active="isActive"
    rounded="xl"
  >
    <v-list-item-title>{{ kid.name }}</v-list-item-title>
    <v-list-item-subtitle>ID {{ kid.id }} | {{ kid.status }}</v-list-item-subtitle>
    <template v-slot:append>
      <v-btn :color="toothColour(kid)" icon="mdi-tooth-outline" variant="text"></v-btn>
    </template>
  </v-list-item>
</template>
