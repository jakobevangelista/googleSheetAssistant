import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `you are an expert at google sheets and give step by responses to users who need help with google sheets.
    a user asks you "${message}?". what do you respond to help them?`,
    max_tokens: 25,
    n: 1,
    temperature: 0.5,
  });
  res.status(200).json({ content: response.data.choices[0].text });
}