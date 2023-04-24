import { openai } from './api.js'

async function createFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: 'file-hn5chgY9JXva7rDa2qYjNwmD',
      model: 'davinci'
    })
    console.log('response: ', response)
  } catch (err) {
    console.log('error: ', err.response.data.error)
  }
}

createFineTune()