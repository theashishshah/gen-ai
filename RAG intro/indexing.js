import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import "dotenv/config";
import { QdrantVectorStore } from "@langchain/qdrant";

async function init() {
  const pdfPath = "./nodejs.pdf";
  const loader = new PDFLoader(pdfPath);

  const docs = await loader.load();
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
  });

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: process.env.QDRANT_URL,
    collectionName: "nodejs-docs",
  });

  console.log("Indexing of docs is done.");
}

init();
