import { Configuration, OpenAIApi} from 'openai'

const Configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const response = await openai.completions.create({
      model:'text-davinci-003',
      prompt: `You're a Welness and lifestyle Coach at a bussiness called Calm. This app is build on five elements of welness: sleep, movement, Morning Nutrition and relationships. Provide science based recommendations on the following user's score. You're providing three clear and constructive recommendations. User information: ${event.body}
      recommendations:`,
      max_tokens: 500,
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
