import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI();

async function chat(query) {
  const userQuery = query;

  const embedding = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embedding,
    {
      url: process.env.QDRANT_URL,
      collectionName: "nodejs-docs",
    },
  );

  const vectorRetriver = vectorStore.asRetriever({
    k: 3, // kitte relevent chunks leke aau
  });

  const releventChunks = await vectorRetriver.invoke(userQuery);

  const SYSTEM_PROMPT = `
    You are an AI assistant who helps resolving user query based on the context available to you from a PDF file, nothing else with content and page number.

    Only answer to user query based on the available context from the file only.
    Context:
    ${JSON.stringify(releventChunks)}
    `;

  const response = await client.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
  });

  console.log("assistant response: >", response.choices[0].message.content);
}

chat("bhai tera name kya hai? tune khana khaya?");
