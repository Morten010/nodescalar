import OpenAI from "openai";

export const openai = new OpenAI({
    baseURL: "http://127.0.0.1:1234/v1/",
    apiKey: ""
});

export const chat = async (messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) => {
    const res = await openai.chat.completions.create({
    messages,
    model: "mistral-ins-7b-q4",
    temperature: 0.7
  })

  console.log(res);
  
  return res.choices[0].message
}