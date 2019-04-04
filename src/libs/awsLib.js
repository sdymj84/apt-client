import { Storage } from 'aws-amplify'

export const s3Upload = async (file) => {
  try {
    const filename = `${Date.now()}-${file.name}`
    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type
    })
    return stored.key
  } catch (e) {
    console.log(e, e.response)
  }
}

export const s3Delete = async (filename) => {
  try {
    await Storage.vault.remove(filename)
  } catch (e) {
    console.log(e, e.response)
  }
}