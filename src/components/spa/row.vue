<template>
  <div
    class="image-text-container"
    :class="{
      'flex-row': imagePosition === 'left',
      'flex-row-reverse': imagePosition === 'right',
    }"
  >
    <div class="image-container" :style="{ maxWidth: imageMaxWidth }">
      <div class="image-wrapper" :style="imageContainMode ? {} : { aspectRatio: imageAspectRatio }">
        <img
          :src="imageUrl"
          :alt="title"
          class="responsive-image"
          :style="{ objectFit: imageContainMode ? 'contain' : 'cover' }"
        />
      </div>
    </div>
    <div class="text-container">
      <h2 class="text-title">{{ title }}</h2>
      <div class="text-body">{{ body }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  imageUrl: string
  title: string
  body: string
  imagePosition: 'left' | 'right'
  imageMaxWidth: string
  imageAspectRatio?: string // Optional
  imageContainMode?: boolean // Should default to false
}>()
</script>

<style scoped>
.image-text-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.image-container {
  flex: 0 0 auto;
}

.image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.responsive-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
}

.text-container {
  flex: 1;
  min-width: 0;
}

.text-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #333;
}

.text-body {
  line-height: 1.6;
  color: #555;
}

/* Responsive styles */
@media (max-width: 768px) {
  .image-text-container {
    flex-direction: column !important;
  }

  .image-container {
    width: 100% !important;
    max-width: 100% !important;
    margin-bottom: 1rem;
  }

  .image-wrapper {
    max-width: 480px;
    margin: 0 auto;
  }

  .text-container {
    width: 100%;
  }
}
</style>
