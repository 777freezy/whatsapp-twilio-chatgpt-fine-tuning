import { openai } from './api.js'

async function createCompletion() {
  try {
    const response = await openai.createCompletion({
      model: '',
      prompt: '',
      max_tokens: 1000
    })
    if (response.data) {
      console.log('choices: ', response.data.choices)
    }
  } catch (err) {
    console.log('err: ', err)
  }
}

createCompletion()