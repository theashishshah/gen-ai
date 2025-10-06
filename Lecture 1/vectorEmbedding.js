import "dotenv/config";
import OpenAI from "openai";
const client = new OpenAI();

const text = "Hey, I'm visiting India! this year, want to visit?"

const embeddingResponse = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
    encoding_format: "float",
});

console.log("Response: ", embeddingResponse.data[0].embedding.length)