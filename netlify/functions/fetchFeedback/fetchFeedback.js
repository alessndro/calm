import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
})

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  
  try {
      const dataUser = event.body.split('*')
      console.log(`Your expertise: ${dataUser[0]}. The user asks you the following questions: ${dataUser[1]}.`)
      const response = await openai.completions.create({
      model:'text-davinci-003',
      prompt: `Your expertise: ${dataUser[0]}. The user asks you the following questions: ${dataUser[1]}.`,
      max_tokens: 200,
      })
  
    const data = response.choices[0].text.trim()

    return {
      statusCode: 200,
      body: JSON.stringify({ value: data }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
