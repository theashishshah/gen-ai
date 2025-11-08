import { OpenAI } from "openai/client";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function aiWritingAssistant(text = "") {
    const SYSTEM_PROMPT = `
    You are an expert English copywriter and content strategist.
    You write high-quality, engaging, and grammatically perfect content with perfect story telling and creative writing.
    When given user text, rewrite it in different tones or styles as requested.
    Always maintain clarity and creativity.
    Do not do anything apart from copywriting. if user asks anything else other than copywriting, respond politely, and ask to give you task related to copywriting.
    
    Output format JSON:
{
    "formal": "tone1 content",
    "casual": "tone2 content",
    "witty": "tone3 content"}
    `;

    const userPrompt = `
    Rewrite the following text in three tones:
    1. Formal
    2. Casual
    3. Witty
    Text: "${text}"
    `;

    const response = await client.chat.completions.create({
        model: "gemini-2.5-pro",
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
    });
    console.log("Re-written versions.");
    console.log(response.choices[0].message.content);
}

aiWritingAssistant("Hey, how are you doing?");
