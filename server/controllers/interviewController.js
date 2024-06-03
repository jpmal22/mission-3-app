const { GoogleGenerativeAI } = require("@google/generative-ai"); //Imports the GoogleGenerativeAI class from the package
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY); //creates new instance of the GoogleGenerativeAI class, passes the env variable
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); //Gets the gemini-1.5-flash model from the GoogleGenerativeAI instance

//Function to call the Google Gemini API 
//Retry added as solution to intermittent errors in communication with the API
async function callGoogleGemini(promptContent, retryCount = 0) {
  try {
    const result = await model.generateContent(promptContent);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error communicating with Google Gemini API:", error);
    if (retryCount < 3) { // Limits to 3 retries - added to prevent infinite loop
      console.log(`Retrying... (${retryCount + 1})`);
      await new Promise(r => setTimeout(r, 5000)); // Waits for 5 seconds
      return callGoogleGemini(promptContent, retryCount + 1);
    } else {
      throw error;
    }
  }
}

exports.getInterviewResponse = async (req, res) => {
  const { jobTitle, userInput, chat } = req.body;

  
  const conversationHistory = chat //creates a string of the conversation history by mapping over the chat array and joining the user and ai responses
    .map((entry) => `${entry.user ? "User" : "AI"}: ${entry.user || entry.ai}`)
    .join("\n");
    //Creates a prompt object with the role of job interviewer, the content of the conversation history, and the user input
    //prompt is used as input to the callGoogleGemini function
const prompt = {
  role: "friendly anonymous job interviewer",
  content: `You are a friendly anonymous job interviewer for the position of ${jobTitle}. Here is the conversation so far:\n${conversationHistory}\nUser: ${userInput}\nAI: Let's get started. `,
};
//callGoogleGemini function sends the prompt content to the Google Gemini API and returns the response
  try {
    const apiResponse = await callGoogleGemini(prompt.content);
    res.json({ content: apiResponse }); //successful call results in JSON response with the content from the API response
  } catch (error) {
    res.status(500).send("Error communicating with AI API");
  }
};
