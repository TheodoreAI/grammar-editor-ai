import { OpenAIApi } from "@openai/api";

const apiKey = "YOUR_API_KEY";
const openai = new OpenAIApi(apiKey);

async function getCompletion(prompt, model = "gpt-3.5-turbo") {
  const messages = [{ role: "user", content: prompt }];

  const response = await openai.complete({
    engine: model,
    messages: messages,
    temperature: 0,
  });

  return response.choices[0].message.content;
}

async function getCompletionFromMessages(
  messages,
  model = "gpt-3.5-turbo",
  temperature = 0
) {
  const response = await openai.complete({
    engine: model,
    messages: messages,
    temperature: temperature,
  });

  return response.choices[0].message.content;
}

export { getCompletion, getCompletionFromMessages };
