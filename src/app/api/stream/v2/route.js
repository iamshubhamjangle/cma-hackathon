import { OpenAIStream } from "@/lib/openai-stream";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "API is up and running!" });
}

export const runtime = "edge";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    // console.log("reqBody", reqBody);
    // console.log("typeof(reqBody)", typeof reqBody);
    // return NextResponse.json("Nice!");

    if (typeof reqBody !== "string")
      return NextResponse.json("Request body should only be a string!");

    const messages = [
      {
        role: "system",
        content:
          "You are a blog writer. Your blog must contain a title, introduction, body and conclusion. The result should be strictly in JSON format with title, body as keys in single object.",
      },
      {
        role: "user",
        content: "Write a blog post on the latest advancement in AI",
      },
      {
        role: "assistant",
        content: `{"title":"The Latest Advancement in AI: Unlocking the Potential of Generative Adversarial Networks", "body":"The Power of GANs Firstly: let&apos;s understand the fundamental concept of GANs. GANs are composed of two components: a generator and a discriminator. The generator&apos;s role is to create synthetic data, while the discriminator&apos;s purpose is to assess the authenticity of the generated content. Through a continuous loop of feedback and improvement, GANs enable machines to produce content that is incredibly difficult to distinguish from real human-made content. High-Quality Image Synthesis: One of the most groundbreaking advancements in GANs is in the field of image synthesis. GANs have evolved to the point where they can generate photo-realistic images from scratch. For instance, BigGAN, developed by researchers at Google, has the ability to generate high-resolution images of stunning quality. This has numerous applications in the creative industry, including game design, virtual reality, and even movie production"}`,
      },
      { role: "user", content: reqBody },
    ];

    // console.log(messages[3]);

    // return NextResponse.json("Nice!");

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
