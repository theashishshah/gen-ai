import { Tiktoken } from "js-tiktoken";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const enc = new Tiktoken(o200k_base);
const prompt = "Hello, how are you doing?"
const tokens = enc.encode(prompt)
console.log({ tokens })
const plainText = enc.decode(tokens)
console.assert(plainText == prompt)
