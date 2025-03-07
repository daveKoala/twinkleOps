<script setup lang="ts">
import AppBar from './AppBar.vue'
</script>

<template>
  <AppBar />

  <v-main class="bg-white-lighten-5">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-sheet rounded="lg" height="100%">
            <slot name="sidebar"> Sidebar </slot>
          </v-sheet>
        </v-col>

        <v-col cols="12" md="8">
          <v-sheet height="100%" rounded="lg">
            <slot></slot>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
