import OpenAI from "openai";

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Assistant ID should be stored in environment variables
export const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID!;

// Initialize a thread for the conversation
export async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread.id;
}
