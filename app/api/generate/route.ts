import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const subject = body.subject;
    const topics = body.topics;
    const examDate = body.examDate;

    const prompt =
      "Create a simple day-wise study plan.\n" +
      "Subject: " + subject + "\n" +
      "Topics: " + topics + "\n" +
      "Exam Date: " + examDate;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const plan =
      completion.choices?.[0]?.message?.content ||
      "No plan generated";

    return NextResponse.json({
      plan: plan,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate plan",
      },
      {
        status: 500,
      }
    );
  }
}