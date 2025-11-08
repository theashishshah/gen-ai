/**
 * 3. Static File Organizer
Goal: Automatically organize files in a folder based on extension.
Example: Move .jpg to images/, .txt to docs/, .js to scripts/.
 */

import fs from "fs";
import path from "path";

const filename = import.meta.filename;
const dirname = import.meta.dirname;

function organizer() {
    const filesList = fs.readdirSync(dirname);

    for (const file of filesList) {
        const sourceFilePath = path.join(dirname, file);
        const extname = path.extname(file);
        switch (extname) {
            case ".png":
                (() => {
                    const destinationFolderPath = path.join(dirname, "images", file);
                    fs.renameSync(sourceFilePath, destinationFolderPath);
                })();
                break;
            case ".js":
                (() => {
                    const destinationFolderPath = path.join(dirname, "scripts", file);
                    fs.renameSync(sourceFilePath, destinationFolderPath);
                })();
                break;
            case ".txt":
                (() => {
                    const destinationFolderPath = path.join(dirname, "text", file);
                    fs.renameSync(sourceFilePath, destinationFolderPath);
                })();
                break;
            default:
                console.log("None above meet");
                break;
        }
    }
}

organizer();
