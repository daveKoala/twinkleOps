<script lang="ts" setup>
import Layout from '@/layouts/SingleColumnLayout.vue'
import { useKidStore } from '@/stores/kidStore'

const kidStore = useKidStore()
</script>

<template>
  <Layout>
    <h1>About</h1>
    <h2>1) Fairy-Written Description</h2>
    <p>
      Hear ye, hear ye! From the mystical realm where gears spin and fairy dust sparkles, the
      Steam-Fairy has arrived to keep track of all things toothy! Whether you’ve just lost a pearly
      white or you’re searching for the next visit’s magical surprise, we’re here to add a dash of
      enchantment and a sprinkle of steampunk charm. Within these pages, you’ll find whimsical tooth
      logs, friendly fairy reminders, and maybe even a hidden gear or two. Step forward with your
      shining smile (or slightly chipped tooth) and let the adventure begin!
    </p>

    <h2>2) Data & Privacy Data Sharing:</h2>
    <p>
      We do not pass any data to outside services. Your personal or child’s name information is
      purely for fun, stored only on your device.
    </p>
    <p>
      <b>Local Storage:</b> This site uses local storage to keep track of visits, tooth statuses, or
      any whimsical notes.
    </p>
    <p>
      <b>Clearing Your Data:</b> You can: Use the “Clear Data” button on the site’s settings page to
      remove all saved info. MYou can manually clear your browser’s local storage via your browser
      settings.
    </p>

    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn color="warning" @click="kidStore.clearKids()">Clear Data</v-btn>
      </v-col>
    </v-row>

    <h2>3) Why This Project</h2>
    <p>
      Exists Fun Afternoon Challenge: I built this small project in a burst of creative
      energy—combining a love of steampunk aesthetics, fairy tales, and the excitement kids feel
      when they lose a tooth. It’s a lighthearted experiment that turned into a fun tool to track
      magical visits. For My Kids: Nothing beats the joy of seeing children’s faces light up with
      wonder! This site adds a sprinkle of extra excitement when the Tooth Fairy makes a stop.
    </p>
    <p>
      It’s simple, free, and purely a passion project to spread a bit of gear-laced, fairy-dust joy.
    </p>

    <h2>4) Collaboration & Inspiration</h2>

    <p>
      This site was developed with a touch of human creativity and a lot of “rubber ducking” and
      brainstorming assisted by ChatGPT. From refining artwork concepts to bouncing around whimsical
      ideas, this AI collaboration helped spark and shape the project’s steampunk-fairy flair.
    </p>

    <p>Images created with ChatGPT and the GPT-4o model using this prompt:</p>

    <p style="font-style: italic" class="px-8">
      Create a [granny tooth] fairy with: "A whimsical steampunk tooth fairy character with vibrant
      steampunk-inspired attire, adorned with intricate cogs, gears, and mechanical wings. The fairy
      exudes a magical aura with glowing, fantastical elements. The setting includes
      retro-futuristic details like brass tools, glowing gadgets, and playful accessories. The scene
      is colorful, child-friendly, and rendered in a consistent illustration style that combines
      fantasy and steampunk aesthetics."
    </p>

    <p>
      Contact If you have questions, suggestions, or just want to say hello, feel free to reach out
      at: [Your Email or Social Handle].
    </p>
    <p>
      Thank you for joining this steamy, sparkly tooth-tracking adventure! May your gear wheels turn
      smoothly, and your fairy wings flutter brightly.
    </p>

    <p class="text-right">Dave and ChatGPT</p>

    <v-img
      :width="300"
      aspect-ratio="1/1"
      cover
      style="margin: auto"
      src="/images/steampunk_tooth_fairy_with_rubber_ducks.jpg"
    ></v-img>
  </Layout>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
