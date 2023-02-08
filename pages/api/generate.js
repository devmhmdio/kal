import { Configuration, OpenAIApi } from "openai";
import { PROMPT } from "../../config";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const Businesskeyword = req.body.Businesskeyword || '';
  const clientKeyword=req.body.clientKeyword || '';
  if (Businesskeyword.trim().length === 0 && clientKeyword.trim().length) {
    res.status(400).json({
      error: {
        message: "Please enter a valid keyword",
      }
    });
    return;
  }

  try {
    
    const promtReplace=PROMPT.replace("<Business Description>",Businesskeyword)
    const ReplacementPromt=promtReplace.replace("<Client Description>",clientKeyword)
    const response = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: ReplacementPromt,
      temperature: 0.7,
      max_tokens: 400,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log("question", ReplacementPromt, response.data + '<br>' + imageElement)
    res.status(200).json({ result: response.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
