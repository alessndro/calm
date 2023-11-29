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
      prompt: `You are a health coach on Calm, a Health platform. A user has checked in today, and you want to provide them with supportive, pragmatic, and nice feedback. 
      Begin by thanking the user for checking in. Acknowledge and compliment the user's highest scoring element, providing positive reinforcement.
      Then, address the lowest scoring element, offering practical and science-based advice inspired by Andrew Huberman. Ensure the tone remains motivational and supportive, encouraging the user on their wellness journey. 
      End the feedback by expressing your availability for any questions or further support."

      User information: The user scores highest on Sleep with a score of 4.5. 
      The user scores the lowest on Relationships with a score of 2.0.
      
      Recommendations: 
      Thank you for checking in today. Great Job on Sleep! Your dedication to Sleep is truly paying off with an average of 4.5. Keep up the fantastic work! 🎉 After reviewing your scores, I noticed that Relationships has room for improvement. Remember, we're not aiming for perfection here, just progress. Now, let's focus on boosting Relationships. Andrew Huberman suggests that small, consistent changes make a big impact. Consider incorporating Calling a friend more often into your routine for an extra boost. For instance, Set a reminder every week to call your best friend. Remember, progress over perfection! 🚀
      
      Keep shining! ✨
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
