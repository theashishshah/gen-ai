// Mini Subword Tokenizer with Encoding
const corpus = ["low", "lower", "newest", "widest"];

function getInitialTokens(words) {
    return words.map((word) => word.split(""));
}

function getPairs(tokensList) {
    const pairs = {};
    tokensList.forEach((tokens) => {
        for (let i = 0; i < tokens.length - 1; i++) {
            const pair = tokens[i] + " " + tokens[i + 1];
            pairs[pair] = (pairs[pair] || 0) + 1;
        }
    });
    return pairs;
}

// Step 3: Merge the most frequent pair
function mergePair(tokensList, pairToMerge) {
    const [first, second] = pairToMerge.split(" ");
    return tokensList.map((tokens) => {
        const mergedTokens = [];
        let i = 0;
        while (i < tokens.length) {
            if (i < tokens.length - 1 && tokens[i] === first && tokens[i + 1] === second) {
                mergedTokens.push(first + second);
                i += 2;
            } else {
                mergedTokens.push(tokens[i]);
                i += 1;
            }
        }
        return mergedTokens;
    });
}

// Step 4: Train mini BPE tokenizer
function trainTokenizer(corpus, vocabSize = 20) {
    let tokensList = getInitialTokens(corpus);
    while (true) {
        const pairs = getPairs(tokensList);
        if (!pairs || Object.keys(pairs).length === 0 || Object.keys(pairs).length >= vocabSize)
            break;

        const mostFreqPair = Object.entries(pairs).sort((a, b) => b[1] - a[1])[0][0];
        tokensList = mergePair(tokensList, mostFreqPair);
    }

    const vocab = new Set(tokensList.flat());
    const tokenToId = {};
    [...vocab].forEach((tok, i) => (tokenToId[tok] = i));

    return { vocab: [...vocab], tokenToId, tokensList };
}

const tokenizer = trainTokenizer(corpus);
console.log("Learned Vocabulary:", tokenizer.vocab);

// Step 5: Encode new words using learned vocab
function encode(word, vocab) {
    const tokens = [];
    let temp = word;

    // Greedy matching: pick longest token from vocab
    while (temp.length > 0) {
        let matched = "";
        for (const token of vocab) {
            if (temp.startsWith(token) && token.length > matched.length) {
                matched = token;
            }
        }
        if (!matched) {
            matched = temp[0]; // fallback to single char
        }
        tokens.push(matched);
        temp = temp.slice(matched.length);
    }
    return tokens;
}

// Example: encode new word
const newWord = "lowest";
const encoded = encode(newWord, tokenizer.vocab);
console.log(`Encoded "${newWord}":`, encoded);
