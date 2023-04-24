import { Configuration, OpenAIApi } from "openai";
import { sendMessage } from "../utils/twilio";

const configuration = new Configuration({
  organization: "org-U0gta8BZQwRPINwrigGwpeiH",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const conversation_histories = new Map<string, string>();

export const runQuery = async (query: string, number: string) => {
  try {
    let conversation_history = conversation_histories.get(number) || "";

    conversation_history += `Q: ${query}\nA:`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: conversation_history,
      max_tokens: 150,
      temperature: 0.9, //valor antigo era de 0.7
    });

    console.log("Response:", response);
    const answer =
      response.data.choices && response.data.choices[0]?.text?.trim() || "";

    conversation_history += `${answer}\n`;

    conversation_histories.set(number, conversation_history);

    sendMessage(number, process.env.TWILIO_PHONE_NUMBER!, answer);
  } catch (error) {
    console.error(error);
  }
};
