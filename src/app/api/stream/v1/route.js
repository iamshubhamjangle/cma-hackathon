import { OpenAIStream } from "@/lib/openai-stream";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "API is up and running!" });
}

export const runtime = "edge";

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

    // Check and push System content to messages
    if (reqBody.systemContent !== undefined) {
      messages.push({ role: "system", content: reqBody.systemContent });
    }

    // Check and push Assistant content to messages
    if (reqBody.assistantContent !== undefined) {
      messages.push({ role: "assistant", content: reqBody.assistantContent });
    }

    // Check and push User content to messages
    messages.push({ role: "user", content: reqBody.userContent });

    const payload = {
      model: "gpt-3.5-turbo",
      messages: messages,
      stream: true,
    };

    const stream = await OpenAIStream(payload);

    return new Response(stream);
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
