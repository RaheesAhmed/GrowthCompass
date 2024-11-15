import OpenAI from "openai";
import { StreamingTextResponse } from "ai";
import { DEVELOPMENT_PLAN_TEMPLATE } from "@/prompts/development_plan_template";

export const runtime = "edge";
export const maxDuration = 300;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistant_id = process.env.OPENAI_ASSISTANT_ID as string;

if (!assistant_id) {
  throw new Error("OPENAI_ASSISTANT_ID is not defined");
}

export async function POST(request: Request) {
  try {
    const { threadId, userData, leadershipData, responses } =
      await request.json();

    // If no threadId is provided, create a new thread
    const currentThreadId = threadId || (await openai.beta.threads.create()).id;

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: "user",
      content: `Generate a plan for the user based on the following data: ${JSON.stringify(
        userData
      )} ${JSON.stringify(leadershipData)} ${JSON.stringify(
        responses
      )}.using the following template: ${DEVELOPMENT_PLAN_TEMPLATE}. Please format your response using advanced Markdown with clear headers, tables, and appropriate formatting for maximum readability.`,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id,
    });

    // Create a stream to check the run status and get messages
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const runStatus = await openai.beta.threads.runs.retrieve(
            currentThreadId,
            run.id
          );

          if (runStatus.status === "completed") {
            // Get the latest message
            const messages = await openai.beta.threads.messages.list(
              currentThreadId
            );
            const lastMessage = messages.data[0];

            if (lastMessage.role === "assistant") {
              const content = lastMessage.content[0].text.value;
              controller.enqueue(new TextEncoder().encode(content));
            }
            controller.close();
            break;
          } else if (runStatus.status === "failed") {
            controller.error("Run failed");
            break;
          }

          // Wait before checking again
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      },
    });

    // Return the stream with the thread ID in headers
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "X-Thread-Id": currentThreadId,
      },
    });
  } catch (error) {
    console.error("Error in streaming route:", error);
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
