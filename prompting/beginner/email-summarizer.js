import { OpenAI } from "openai/client";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function emailSummarizer(emaildata = "") {
    const fewShotExamples = `Example 1:
    Email: "Hey John, please send the revised budget before Monday. Thanks!"
    Summary: Sender asks John to send the revised budget before Monday.
    follow up: Sure, I will send you the revised budget by Monday or earlier if possible.

    Example 2:
    Email: "Hi, I’ve attached the latest sales report. Let me know if you need any clarifications."
    Summary: Sender shared the latest sales report and is open to questions.
    follow-up: Sure, let me check the report and get back to you.
    `;

    const SYSTEM_PROMPT = `You are an AI assistant that summarizes emails into short, action-based summaries.
    Focus on key details like sender, purpose, and required actions.
    examples: ${fewShotExamples}`;

    const userPrompt = `Email: ${emaildata}`;

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
    console.log("\n✉️ Email Summary:\n");
    console.log(response.choices[0].message.content);
}
const email = `Hey Alex, could you confirm the venue for tomorrow’s client meeting? We need to finalize by EOD.`;

emailSummarizer(email);
