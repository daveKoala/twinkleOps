<script lang="ts" setup>
import { type Kid, BedroomStatusValues, type Fairy } from '@/types'
import FairyDetail from '@/components/fairyDetail.vue'
import { resolveImageUrl } from '@/utils/imageUtils'
import { ref, onMounted, watch } from 'vue'
import { fairies } from '@/data/fairies'

const props = defineProps<{ kid: Kid }>()

const detailsSection = ref<HTMLDivElement | null>(null)
defineExpose({ detailsSection })

const imageUrl = ref('')

const seenText = (kid: Kid): string => {
  if (kid.seen == true && kid.status === 'Visited') {
    return 'Yes, sprinkled Fairy Dust to help them forget'
  }
  return ''
}

const getBedroomConditionValue = (kid: Kid): number => {
  if (kid.conditionOfBedroom) {
    return BedroomStatusValues[kid.conditionOfBedroom]
  }

  return 0
}

const getFairy = (id: string | number): Fairy => {
  return fairies.find((item) => item.id == id) || fairies[4]
}

const updateImageUrl = async () => {
  imageUrl.value = await resolveImageUrl(props.kid)
}

onMounted(() => {
  updateImageUrl()
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
  <v-sheet class="pa-4" rounded>
    <div ref="detailsSection"></div>
    <v-row dense>
      <v-col cols="12" md="4">
        <v-card variant="outlined" class="my-4 border-warning" border="lg">
          <v-card-item>
            <v-img :src="imageUrl" height="200px" class="my-4" />
            <div class="text-h6 mb-1">
              <span class="font-weight-bold">Name: </span>{{ kid.name }}
            </div>
            <div class="text-h6 mb-1">
              <span class="font-weight-bold">Status: </span>{{ kid.status }}
            </div>
          </v-card-item>
        </v-card>
        <FairyDetail :fairy="getFairy(kid.fairyId)" v-if="kid.fairyId" />
      </v-col>
      <v-col cols="12" md="8">
        <v-card flat>
          <v-card-item
            ><div>
              <div class="text-h4 mb-1">
                <v-icon
                  color="success"
                  icon="mdi-tooth-outline"
                  size="med"
                  v-show="kid.status === 'Visited'"
                ></v-icon>
                Tooth Fairy Report
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Name: </span>{{ kid.name }}
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Age: </span>{{ kid.age }}
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Country: </span>{{ kid.country }}
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Bredroom Status: </span>
                <v-icon
                  color="yellow-lighten-1"
                  icon="mdi-star"
                  v-for="n in getBedroomConditionValue(kid)"
                  :key="`star-${n}`"
                ></v-icon>
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Left Money: </span>{{ kid.moneyLeft ? 'Yes' : 'No' }}
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Fairy seen?: </span>{{ seenText(kid) }}
              </div>
              <div class="text-h6 mb-1">
                <span class="font-weight-bold">Notes: </span>
                <div class="text-h6 mb-1">{{ kid.notes }}</div>
              </div>
            </div></v-card-item
          >
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>
