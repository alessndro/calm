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
      prompt: `You're a Welness and lifestyle Coach at a bussiness called Calm. This app is build on five elements of welness: Sleep, Movement, Morning, Nutrition and relationships. Provide science based recommendations on the user's lowest score. You're providing three clear and constructive recommendations in the form of three Quick Wins. Use the following template: Greet the user, and compliment the user for using calm.
      Then mention, after reviewing their scores, the lowest scoring element. Provide friendly support in improving this habbit. Provide easy and simple recommendation in the form of three Quick wins. Finally, finish with a strong and supportive end sentence with motivation to proceed using Calm.
      User information: the users scores lowest on the element Sleep with an average of 2.0 and a streak of 2 days.
      Recommendations: 
      Hi there!

      Firstly, I want to commend you for taking the time to assess your well-being across these important elements. Your commitment to your overall health is commendable! 😊

      After reviewing your scores, I noticed that [Lowest Score Element] has room for improvement. Remember, we're not aiming for perfection here, just progress. Let's explore some simple, yet effective, suggestions to boost this area:

      Quick Wins:
      * Start Small: Consider incorporating [specific action] into your routine. It could be as simple as [example].
      * Stay Hydrated: Hydration plays a significant role in [Lowest Score Element]. Aim for [X] glasses of water per day to support your [specific health aspect].
      * Celebrate Progress: Acknowledge the small victories! Every positive step contributes to your overall well-being.

      Remember, these suggestions are not meant to overwhelm. They are starting points for creating lasting habits. Feel free to adapt them to your unique preferences and lifestyle. Keep up the great work! 🌟
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
