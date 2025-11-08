import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import chalk from "chalk"; // for colorized output

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const playgroundDir = path.resolve(__dirname, "playground");

// ✅ Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.green("mini-fs-CLI> "),
});

// ✅ Start the CLI prompt
console.log(chalk.cyanBright("Welcome to Mini File System CLI!"));
console.log(chalk.gray("Type 'help' to see available commands.\n"));
rl.prompt();

// ✅ Command handler
rl.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");
    const target = args[0];

    switch (command) {
        case "ls":
            listFiles();
            break;
        case "cat":
            readFile(target);
            break;
        case "touch":
            createFile(target);
            break;
        case "rm":
            deleteFile(target);
            break;
        case "mkdir":
            createFolder(target);
            break;
        case "clear":
            console.clear();
            break;
        case "help":
            showHelp();
            break;
        case "exit":
            console.log(chalk.yellow("Goodbye! 👋"));
            rl.close();
            break;
        default:
            console.log(chalk.red("Unknown command. Type 'help' for a list of commands."));
    }

    rl.prompt();
});

function getFullPath(targetPath = ".") {
    return path.resolve(playgroundDir, targetPath);
}

function listFiles() {
    const files = fs.readdirSync(playgroundDir);
    console.log(chalk.blue("📁 Files in playground:"));
    files.forEach((file) => console.log(" -", file));
}

function readFile(fileName) {
    if (!fileName) return console.log(chalk.red("❌ Please specify a file name."));
    const filePath = getFullPath(fileName);
    if (!fs.existsSync(filePath)) return console.log(chalk.red("❌ File not found."));
    console.log(chalk.yellow("\n📄 " + fileName + ":"));
    console.log(fs.readFileSync(filePath, "utf8"));
}

function createFile(fileName) {
    if (!fileName) return console.log(chalk.red("❌ Please specify a file name."));
    const filePath = getFullPath(fileName);
    fs.writeFileSync(filePath, "", { flag: "a" });
    console.log(chalk.green("✅ File created: " + fileName));
}

function deleteFile(fileName) {
    if (!fileName) return console.log(chalk.red("❌ Please specify a file name."));
    const filePath = getFullPath(fileName);
    if (!fs.existsSync(filePath)) return console.log(chalk.red("❌ File not found."));
    fs.unlinkSync(filePath);
    console.log(chalk.red("🗑️ File deleted: " + fileName));
}

function createFolder(folderName) {
    if (!folderName) return console.log(chalk.red("❌ Please specify a folder name."));
    const folderPath = getFullPath(folderName);
    if (fs.existsSync(folderPath)) return console.log(chalk.yellow("⚠️ Folder already exists."));
    fs.mkdirSync(folderPath);
    console.log(chalk.green("📂 Folder created: " + folderName));
}

function showHelp() {
    console.log(`
${chalk.cyan("Available Commands:")}
  ${chalk.yellow("ls")}         - list files
  ${chalk.blue("cat <file>")} - read a file
  ${chalk.yellow("touch <file>")} - create a new file
  ${chalk.yellow("rm <file>")}  - delete a file
  ${chalk.yellow("mkdir <dir>")} - create a folder
  ${chalk.yellow("clear")}      - clear screen
  ${chalk.yellow("exit")}       - quit the CLI
`);
}
