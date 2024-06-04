//1.Imports the GoogleGenerativeAI class from the @google/generative-ai package.
//2.Creates a new instance of GoogleGenerativeAI with the GOOGLE_GEMINI_API_KEY environment variable.
//3.Calls the getGenerativeModel method on the genAI instance to get the "gemini-1.5-flash" model.
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Added retry logic to handle intermittent failures communicating with the AI API, solving this issue in most cases
async function callGoogleGemini(promptContent, retryCount = 0) {
  try {
    const result = await model.generateContent(promptContent);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error communicating with Google Gemini API:", error);
    if (retryCount < 3) {
      console.log(`Retrying... (${retryCount + 1})`);
      await new Promise((r) => setTimeout(r, 5000));
      return callGoogleGemini(promptContent, retryCount + 1);
    } else {
      throw error;
    }
  }
}

exports.getInterviewResponse = async (req, res) => {
  const { jobTitle, userInput, chat, questionCount = 0 } = req.body;

  const conversationHistory = chat
    .map((entry) => `${entry.user ? "User" : "AI"}: ${entry.user || entry.ai}`)
    .join("\n");

let promptContent;
if (questionCount === 0) {
  promptContent = `You are a job interviewer for the position of ${jobTitle}. Start the interview by asking "Tell me about yourself". Do not use a candidate's name in the conversation.`;
} else if (questionCount < 6) {
  promptContent = `You are a job interviewer for the position of ${jobTitle}. Continue the interview based on the user's input and ask the next question. Consider the entire conversation history when generating your response. Here is the conversation so far:\n${conversationHistory}\nUser: ${userInput}\nAI:`;
} else {
  promptContent = `You are a job interviewer for the position of ${jobTitle}. Based on the user's answers, provide detailed feedback and specific suggestions directly to the user on how they can improve their interview responses and better prepare for the real interview. 
  Address the user directly with "you" instead of "the user". Consider the entire conversation history when generating your response. Here is the conversation so far:\n${conversationHistory}\nUser: ${userInput}\nAI:`;
}

  try {
    const apiResponse = await callGoogleGemini(promptContent);
    res.json({ content: apiResponse, questionCount: questionCount + 1 });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).send("Error communicating with AI API");
  }
};
