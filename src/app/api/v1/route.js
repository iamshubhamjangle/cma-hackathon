import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function GET() {
  return NextResponse.json({ status: "API is up and running!" });
}

export const config = {
  runtime: "edge",
};

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const messages = [];

    // Check and push User content to messages
    if (reqBody.userContent === undefined) {
      return NextResponse.json({
        status: "failed",
        error: "userContent is required property!",
      });
    }

    messages.push({ role: "user", content: reqBody.userContent });

    // Check and push System content to messages
    if (reqBody.systemContent !== undefined) {
      messages.push({ role: "system", content: reqBody.systemContent });
    }

    // Check and push Assistant content to messages
    if (reqBody.assistantContent !== undefined) {
      messages.push({ role: "assistant", content: reqBody.assistantContent });
    }

    // Create new instance of openAi
    const openAi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.CHAT_GPT_API_KEY,
      })
    );

    // Await the response from OpenAI
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Send back the response
    return NextResponse.json({
      status: "success",
      result: response.data.choices[0].message.content,
    });
  } catch (e) {
    // Handle Errors
    console.log("----------START---------");
    console.log(e);
    console.log("-----------END----------");
    return NextResponse.json({
      status: "failed",
      error: "We are unable to process this request. :(",
    });
  }
}
