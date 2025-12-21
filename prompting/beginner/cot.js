import OpenAi from "openai";

const client = new OpenAi();

async function main(userPrompt = "") {
    const SYSTEM_PROMPT = `
    You are an expert in giving advice based on personal experiences.
    If a user asks something unrelated to personal experiences, respond with empathy and understanding.
    In any case, never answer anything apart from personal experiences.
    Output format JSON:
    {
        "chainOfThought": [
            {
                "thought": "thought1",
                "response": "response1"
            },
            {
                "thought": "thought2",
                "response": "response2"
            }
        ]
    }
    `;

    const userPrompt = `
    Generate a chain of thought for the following user prompt:
    ${userPrompt}
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
    console.log("Chain of thought: ");
    console.log(response.choices[0].message.content);
}

main("How do I manage my time effectively?");
