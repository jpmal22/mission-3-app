
/**const { readDB, writeDB } = require('../utils/databaseUtils');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

exports.getInterviewResponse = async (req, res) => {

    const { sessionID, jobTitle, userInput } = req.body;
    const db = readDB();

    if (!db.sessions[sessionID]) {
        db.sessions[sessionID] = { jobTitle, history: []};
    }

    db.sessions[sessionID].history.push(userInput);
    writeDB(db);

    try {
        const prompt = createPrompt(db.sessions[sessionID]);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ question: text });
    
    } catch (error) {
        console.error('Failed to get data from Gemini:', error);
        res.status(500).json({ error: 'Failed to communicate with Gemini'});
    }
};

function createPrompt(session) {
    let prompt = `Job interview for a ${session.jobTitle}: \n`;
    session.history.forEach((input, index) => {
        if (index === 0) {
            prompt += `Tell me about yourself.\n${input}\n`;
        } else {
            prompt += `Q: ${session.history[index - 1].question}\nA: ${input}\nQ: `;
        }
    });
    return prompt + "Q: ";
}***/


// Import OpenAI library
const OpenAI = require("openai").default;
require('dotenv').config();

// Initialize the OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const { readDB, writeDB } = require('../utils/databaseUtils');

// Function to generate AI responses using OpenAI
async function getGenerativeAIResponse(previousMessages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant, specialized in job interviews." },
        ...previousMessages
      ]
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to get data from OpenAI:', error);
    throw new Error('Failed to communicate with OpenAI service');
  }
}

// API endpoint for handling interview responses
exports.getInterviewResponse = async (req, res) => {
  const { sessionID, userInput } = req.body;
  const db = readDB();
  if (!db.sessions[sessionID]) {
    db.sessions[sessionID] = { history: [] };
  }

  // Add user input to the session history
  db.sessions[sessionID].history.push({ role: "user", content: userInput });
  writeDB(db);

  // Prepare the history for API request
  try {
    const responseText = await getGenerativeAIResponse(db.sessions[sessionID].history);
    // Update history with the AI's response
    db.sessions[sessionID].history.push({ role: "assistant", content: responseText });
    writeDB(db);
    
    // Send response back to the client
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).send("Error communicating with AI API");
  }
};
