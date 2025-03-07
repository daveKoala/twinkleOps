import { type Kid, type BedroomStatus, BedroomStatusValues } from '@/types'
import { useKidStore } from '@/stores/kidStore'
import { getRandomNote } from '@/data/fairies'
import { storeImage } from '@/utils/indexDB'
import config from '@/config'
import { ref } from 'vue'

export function useKidForm() {
  const kidsStore = useKidStore()

  const createNewKid = (): Kid => ({
    conditionOfBedroom: 'cluttered',
    country: 'United Kingdom',
    status: 'Pending',
    moneyLeft: false,
    fairyId: '',
    seen: false,
    avatar: '',
    notes: '',
    name: '',
    id: '',
    age: 0,
  })

  const uploadedFile = ref<File | null>(null)
  const newKid = ref<Kid>(createNewKid())
  const loading = ref<boolean>(false)
  const form = ref<boolean>(false)
  const message = ref<string>('')

  const resetNewKid = () => {
    newKid.value = createNewKid()
  }

  const saveFile = async () => {
    if (!uploadedFile.value) {
      message.value = 'No file to save!'
      newKid.value.avatar = ''
      return
    }

    const file = uploadedFile.value
    const id = `file_${Date.now()}`

    try {
      await storeImage(id, file)
      message.value = `File "${file.name}" saved successfully!`
      newKid.value.avatar = id
    } catch (error) {
      console.error('Error saving file:', error)
      message.value = 'Failed to save the file. Please try again.'
    }
  }

  const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      uploadedFile.value = input.files[0]
      message.value = `File selected: ${input.files[0].name}`
      saveFile()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (event: Event) => {
    // Keeping it as record of whats going on
    if (!form.value) return

    const now = Date.now()
    newKid.value.id = newKid.value.id || `${config.customIdPrefix}${now}`

    loading.value = true
    kidsStore.addOrUpdateKid(newKid.value)

    setTimeout(() => {
      loading.value = false
      resetNewKid()
    }, 2000)
  }

  const generateNotes = (kid: Kid) => {
    kid.notes = getRandomNote()
  }

  const required = (v: unknown) => !!v || 'Field is required'

  const bedroomStatusOptionLabels = (
    Object.keys(BedroomStatusValues) as (keyof typeof BedroomStatusValues)[]
  )
    .filter((k) => isNaN(Number(k)))
    .map((k) => ({
      label: k.toLocaleUpperCase(),
      value: k as BedroomStatus,
    }))

  return {
    bedroomStatusOptionLabels,
    generateNotes,
    uploadedFile,
    onFileChange,
    resetNewKid,
    saveFile,
    onSubmit,
    required,
    loading,
    message,
    newKid,
    form,
  }
}
