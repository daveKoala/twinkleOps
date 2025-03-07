<script lang="ts" setup>
import { useKidForm } from '@/composables/useKidForm'
import kidDetails from '@/components/kidDetails.vue'
import { useKidStore } from '@/stores/kidStore'
import Layout from '@/layouts/BasicLayout.vue'
import { type BedroomStatus } from '@/types'
import { fairies } from '@/data/fairies'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import config from '@/config'

const route = useRoute()

const {
  bedroomStatusOptionLabels,
  generateNotes,
  uploadedFile,
  onFileChange,
  resetNewKid,
  onSubmit,
  required,
  newKid,
  form,
} = useKidForm()

const kidsStore = useKidStore()

const selected = ref()

const useAvatar = ref<boolean>(false)

const ages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 52]

const directLink = ref<string>()

const countries = ['United Kingdom', 'Wales', 'Scotland', 'Ireland', 'Northern Ireland', 'England']

const selectExistingKid = (id: string | number) => {
  const selectedKid = kidsStore.customKids.find((kid) => kid.id === id)
  if (selectedKid) {
    newKid.value = selectedKid
  } else {
    resetNewKid()
  }
}

const avatars = () => {
  const avatarArray = []

  for (let i = 1; i <= 4; i++) {
    avatarArray.push({
      name: `toothy ${i}`,
      avatar: `tooth_${i}.jpg`,
    })
  }
  return avatarArray
}

const onSubmitWithLink = (event: Event) => {
  onSubmit(event)
  directLink.value = generateQueryString(newKid.value)
}

const generateQueryString = (kid: typeof newKid.value): string => {
  const params = new URLSearchParams()

  if (kid.fairyId) params.append('fairyName', fairies.find((f) => f.id === kid.fairyId)?.name || '')
  if (kid.status) params.append('status', kid.status === 'Visited' ? 'true' : 'false')
  if (kid.conditionOfBedroom) params.append('tidy', kid.conditionOfBedroom)
  if (kid.moneyLeft) params.append('money', kid.moneyLeft.toString())
  if (kid.age) params.append('age', kid.age.toString())
  if (kid.notes) params.append('notes', kid.notes)
  if (kid.name) params.append('name', kid.name)

  params.append('seen', kid.seen ? 'true' : 'false') // Boolean as a string

  return params.toString() // Returns a properly formatted query string
}

const copyToClipboard = () => {
  const url = `${config.baseURL}messages?${generateQueryString(newKid.value)}`
  navigator.clipboard.writeText(url)
}

onMounted(() => {
  if (route.query) {
    newKid.value = {
      ...newKid.value,

      country: typeof route.query.country === 'string' ? route.query.country : 'England',
      age: typeof route.query.age === 'string' ? Number(route.query.age) || 0 : 0, // Ensure number
      notes: typeof route.query.notes === 'string' ? route.query.notes : '',
      name: typeof route.query.name === 'string' ? route.query.name : '',
      status: route.query.status === 'true' ? 'Visited' : 'Pending',
      moneyLeft: route.query.money === 'true',
      seen: route.query.seen === 'true',

      // @ts-expect-error Not worth the effort today - quick and dirty
      fairyId: fairies.find((fairy) => fairy.name === route.query.fairyName) || fairies[0]?.id,

      conditionOfBedroom:
        typeof route.query.tidy === 'string' ? (route.query.tidy as BedroomStatus) : 'tidy',
    }
  }
})
</script>

<template>
  <Layout>
    <template v-slot:sidebar>
      {{ selected }}
      <v-card class="mx-auto" flat>
        <v-select
          @update:modelValue="selectExistingKid"
          :items="kidsStore.customKids"
          item-title="name"
          item-value="id"
          label="Select"
          clearable
          :disabled="kidsStore.customKids.length < 1"
        ></v-select>
      </v-card>
      <v-card class="mx-auto py-8" flat>
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="newKid.name"
            :rules="[required]"
            class="mb-2"
            label="Name"
            clearable
          ></v-text-field>

          <v-select label="Age" :items="ages" v-model="newKid.age" :rules="[required]"></v-select>

          <v-select label="Country" :items="countries" v-model="newKid.country"> </v-select>

          <v-checkbox
            v-model="useAvatar"
            color="orange-darken-3"
            label="Upload image"
            hide-details
          ></v-checkbox>

          <v-file-input
            label="Profile picture"
            v-model="uploadedFile"
            @change="onFileChange"
            accept="image/*"
            v-if="useAvatar"
          ></v-file-input>

          <v-select
            v-model="newKid.avatar"
            label="Assign toothy avatar"
            item-title="name"
            :items="avatars()"
            item-value="avatar"
            v-else
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :append-avatar="`images/${item.raw.avatar}`"
              ></v-list-item>
            </template>
          </v-select>

          <v-select
            v-model="newKid.conditionOfBedroom"
            :items="bedroomStatusOptionLabels"
            label="Bedroom tidy?"
            item-title="label"
            item-value="value"
          >
          </v-select>

          <v-select
            v-model="newKid.fairyId"
            label="Assign fairy"
            :rules="[required]"
            item-title="name"
            :items="fairies"
            item-value="id"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :append-avatar="`images/${item.raw.avatar}`"
              ></v-list-item>
            </template>
          </v-select>

          <v-radio-group label="Fairy visit status" v-model="newKid.status">
            <v-radio label="Pending" value="Pending"></v-radio>
            <v-radio label="Visited" value="Visited"></v-radio>
          </v-radio-group>

          <v-checkbox
            v-if="newKid.status === 'Visited'"
            v-model="newKid.moneyLeft"
            color="orange-darken-3"
            label="Money left?"
            hide-details
          ></v-checkbox>

          <v-checkbox
            v-if="newKid.status === 'Visited'"
            color="orange-darken-3"
            v-model="newKid.seen"
            label="Fairy seen?"
            hide-details
          ></v-checkbox>

          <v-textarea
            @click:prependInner="generateNotes(newKid)"
            prepend-inner-icon="mdi-comment"
            clear-icon="mdi-close-circle"
            v-model="newKid.notes"
            label="Notes"
            clearable
          ></v-textarea>
        </v-form>
        <v-card-actions>
          <v-text-field
            label="Link"
            v-model="directLink"
            append-icon="mdi-content-copy"
            @click:append="copyToClipboard"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none ms-4 text-white"
            @click="onSubmitWithLink"
            color="blue-darken-4"
            :disabled="!form"
            variant="flat"
            rounded="6"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
    <kidDetails :kid="newKid" />
  </Layout>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    align-items: center;
    min-height: 100vh;
    display: flex;
  }
}
</style>
