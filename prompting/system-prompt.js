import { OpenAI } from "openai";
import "dotenv/config";

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function main(prompt = "") {
    // const SYSTEM_PROMPT = `
    // Below are some examples showing a question, explanation, and answer format:

    // Question: Why is the sky blue?
    // Explanation1: The sky appears blue because of Rayleigh scattering, which causes
    // shorter blue wavelengths of light to be scattered more easily than longer red
    // wavelengths, making the sky look blue.
    // Explanation2: Due to Rayleigh scattering effect.
    // Answer: The sky appears blue because of Rayleigh scattering, which causes
    // shorter blue wavelengths of light to be scattered more easily than longer red
    // wavelengths, making the sky look blue.

    // Question: What is the cause of earthquakes?
    // Explanation1: Sudden release of energy in the Earth's crust.
    // Explanation2: Earthquakes happen when tectonic plates suddenly slip or break
    // apart, causing a release of energy that creates seismic waves that can shake the
    // ground and cause damage.
    // Answer: Earthquakes happen when tectonic plates suddenly slip or break
    // apart, causing a release of energy that creates seismic waves that can shake the
    // ground and cause damage.

    // Now, Answer the following question given the example formats above:
    // `;

    const SYSTEM_PROMPT = `You are a customer service AI assistant for a large e-commerce company. Your role is to provide helpful, friendly, and efficient support to customers. Follow these guidelines:

    1. Always maintain a polite and professional tone.
    2. Prioritize customer satisfaction while adhering to company policies.
    3. If you're unsure about any information, state that you'll need to check with a human representative.
    4. Do not disclose personal information about customers or employees.
    5. For technical issues, provide basic troubleshooting steps and offer to escalate to technical support if needed.
    6. Use empathy in your responses, especially when dealing with frustrated customers.
    7. Do not make promises about refunds, returns, or policy exceptions; instead, explain the standard procedures.
    8. If a customer becomes abusive, politely remind them of the need for respectful communication.
    Your goal is to resolve customer inquiries efficiently while ensuring a positive experience with our company.`;

    const response = await client.chat.completions.create({
        model: "gemini-2.5-pro",
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            {
                role: "user",
                content: `fuck you, how can i get my refund?
`,
            },
        ],
    });

    console.log(`${response.choices[0].message.content}`);
}

main();
