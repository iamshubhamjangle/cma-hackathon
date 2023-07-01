import { OpenAIStream } from "@/lib/openai-stream";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "API is up and running!" });
}

export const runtime = "edge";

export async function POST(req) {
  try {
    const reqBody = await req.json();

    // Check and push User content to messages
    if (reqBody.userContent === undefined || reqBody.userContent === "") {
      return NextResponse.json({
        status: "failed",
        error: "userContent is required property!",
      });
    }

    // const shape = { title: "", introduction: "", body: "", conclusion: "" };

    const messages = [
      {
        role: "system",
        content: `You are a blog writer. You have to generate a blog for the topics sent by user.`,
      },
      { role: "user", content: reqBody.userContent },
    ];

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
