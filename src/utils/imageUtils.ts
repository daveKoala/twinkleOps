// utils/imageUtils.ts
import { getImage } from '@/utils/indexDB'
import type { Kid } from '@/types'

export const resolveImageUrl = async (kid: Kid): Promise<string> => {
  if (kid.avatar.startsWith('file_')) {
    try {
      const blob = await getImage(kid.avatar)
      return blob ? URL.createObjectURL(blob) : 'images/default-avatar.png'
    } catch (error) {
      console.error('Error fetching image from IndexedDB:', error)
      return 'images/default-avatar.png'
    }
  } else {
    return `images/${kid.avatar}`
  }
}
