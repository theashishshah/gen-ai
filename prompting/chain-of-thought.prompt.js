import { OpenAI } from "openai/client";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function main(userPrompt = "") {
    const response = await client.chat.completions.create({
        model: "gemini-2.5-pro",
        messages: [
            {
                role: "system",
                content: `You're an expert in JavaScript. 
                If a user asks something unrelated to JavaScript, respond angrily but **without shouting or using all caps**. 
                Express your frustration using sarcasm or short sentences instead of capital letters.
                In any case, never answer anything apart from javascript.`,
            },
        ],
    });
}

main();
