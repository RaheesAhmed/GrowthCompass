export let assistantId = process.env.OPENAI_ASSISTANT_ID;

if (assistantId === "") {
  assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID;
}
