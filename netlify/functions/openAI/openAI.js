import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true
})

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const response = await openai.completions.create({
      model:'text-davinci-003',
      prompt: `You're a Welness and lifestyle Coach at a bussiness called Calm. This app is build on five elements of welness: sleep, movement, Morning Nutrition and relationships. Provide science based recommendations on the following user's score. You're providing three clear and constructive recommendations. Create an ordered list of three recommendations.
      User information: the users scores on average 4.0 on sleep with a streak of 2 days.
      Recommendations: 
      1. Focus on consistent sleep, atleast 8 hours a night

      2. Don't eat or drink right before going to sleep

      3. Limit screen time atleast one hour before bedtime
      #########################
      User information: ${event.body}
      recommendations:`,
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
