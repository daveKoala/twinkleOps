// This file contains the code for the IndexedDB (The browsers own client side database) utility functions.
// The 'storeImage' function stores an image in the database,
// 'getImage' retrieves an image by its ID, and 'dropDatabase' deletes the entire database.

const DB_NAME = 'myImagesDB'
const DB_VERSION = 1

let db: IDBDatabase | null = null

const openDB = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (e) => {
      const target = e.target as IDBOpenDBRequest
      db = target.result
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' })
      }
    }

    request.onsuccess = (e) => {
      const target = e.target as IDBOpenDBRequest
      db = target.result
      resolve()
    }

    request.onerror = (e) => {
      const target = e.target as IDBOpenDBRequest
      reject(target.error)
    }
  })
}

export const storeImage = async (id: string, file: Blob): Promise<void> => {
  await openDB()
  if (!db) throw new Error('Database not initialized')
  const tx = db.transaction('images', 'readwrite')
  const store = tx.objectStore('images')

  store.put({ id, blob: file })

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export const getImage = async (id: string): Promise<Blob | null> => {
  await openDB()
  if (!db) throw new Error('Database not initialized')
  const tx = db.transaction('images', 'readonly')
  const store = tx.objectStore('images')

  return new Promise((resolve, reject) => {
    const request = store.get(id)
    request.onsuccess = () => {
      const result = request.result
      resolve(result ? result.blob : null)
    }
    request.onerror = () => reject(request.error)
  })
}

export const dropDatabase = async (): Promise<void> => {
  if (db) {
    db.close() // Close the open connection
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME)

    request.onsuccess = () => {
      console.log(`Database "${DB_NAME}" deleted successfully.`)
      resolve()
    }

    request.onerror = () => {
      // Does also expect object as parameter, but not used here
      console.error(`Failed to delete database "${DB_NAME}".`)
      reject(request.error)
    }

    request.onblocked = () => {
      console.warn(
        `Deletion of database "${DB_NAME}" is blocked. Please ensure all tabs are closed.`,
      )
      reject(new Error('Database deletion blocked.'))
    }
  })
}
