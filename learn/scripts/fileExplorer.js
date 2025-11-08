/**
 * 1. File Path Explorer
    Goal: Take a folder path as input, print all files and subfolders with absolute paths.
    Concepts: path.join(), fs.readdirSync(), fs.statSync(), recursion.
 */

import path from "path";
import fs from "fs";

const fileName = import.meta.filename;
const dirName = import.meta.dirname;

const folderPath = process.argv[2];

if (!folderPath) {
    console.error("❌ Please provide folder path in CLI argument.");
    process.exit(1);
}

// test = /Users/ashishshah/Downloads/Ashish Shah/Web Dev/Projects/learnit/GenAI/learn

function fileExplorer(folderPath) {
    // 1. Print all files and folder present in this currect folder.
    // 3. Go to all sub-folder one by one and print all files present there.

    const itemsPath = fs.readdirSync(folderPath);

    for (const item of itemsPath) {
        const itemPath = path.join(folderPath, item);

        const stats = fs.statSync(itemPath);
        let absPath;
        if (stats.isDirectory()) absPath = `📁 ${itemPath}`;
        else absPath = `📄 ${itemPath}`;

        fs.appendFileSync("files.txt", `${absPath}\n`);
    }
}
const bytee = 1024 * 1024;
// fileExplorer(dirName);

function printAllFiles(currDir) {
    const itemsPath = fs.readdirSync(currDir);
    for (const item of itemsPath) {
        const itemPath = path.join(currDir, item);
        const stats = fs.statSync(itemPath);
        let absFilePath;
        if (stats.isDirectory()) {
            printAllFiles(itemPath);
        } else absFilePath = `📄 ${itemPath}`;
        if (absFilePath) {
            // base name, dir, ext, filesize, isFile or isDir
            const basename = path.basename(absFilePath);
            const dirname = path.dirname(absFilePath);
            const extname = path.extname(absFilePath);
            const filesize = stats.size + " bytes";
            const text = `basename: ${basename},
            dirname: ${dirname},
            extension name: ${extname},
            filesize: ${filesize},
            isFile: true
            `;
            fs.appendFileSync("projectTwo.txt", `${text} \n`);
        }
    }
}
const abspath = "/Users/ashishshah/Downloads/Ashish Shah/Web Dev/Projects/learnit/GenAI/learn";
printAllFiles(abspath);
