<script lang="ts" setup>
import { ref } from 'vue'

const ages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const countries = ['United Kingdom', 'Wales', 'Scotland', 'Ireland', 'Northern Ireland', 'England']

const age = ref(6)

const country = ref()

const name = ref('')
</script>

<template>
  <v-card flat>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="6">
        <v-text-field label="Name" v-model="name" class="ma-2"></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select label="Age" :items="ages" v-model="age" class="ma-2"></v-select>
      </v-col>

      <v-col cols="12" sm="12">
        <v-select label="Country" :items="countries" v-model="country" class="ma-2"> </v-select>
      </v-col>
    </v-row>
  </v-card>
  <v-divider />
</template>
