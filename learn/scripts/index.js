const fileExplorer = async (dirPath) => {
    const dir = await fs.promises.opendir(dirPath);
    const promises = dir.map(async (dirent) => {
        const filePath = path.join(dirPath, dirent.name);
        const stats = await fs.promises.stat(filePath);
        if (stats.isDirectory()) {
            return fileExplorer(filePath);
        } else if (stats.isFile()) {
            return filePath;
        }
    });
    const files = await Promise.all(promises);
    return files.flat();
};

const printAllFiles = async (dirPath) => {
    const files = await fileExplorer(dirPath);
    console.log(files);
};

printAllFiles(abspath);
