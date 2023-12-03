const fs = require('fs');
const path = require('path');

function mergeFolders(directory) {
    const yearFolders = fs.readdirSync(directory);

    yearFolders.forEach((yearFolder) => {
        const yearFolderPath = path.join(directory, yearFolder);
        const yearFolderStat = fs.statSync(yearFolderPath);

        if (yearFolderStat.isDirectory()) {
            const monthFolders = fs.readdirSync(yearFolderPath);

            monthFolders.forEach((monthFolder) => {
                const monthFolderPath = path.join(yearFolderPath, monthFolder);
                const monthFolderStat = fs.statSync(monthFolderPath);

                if (monthFolderStat.isDirectory()) {
                    const daysFolders = fs.readdirSync(monthFolderPath);
                    daysFolders.forEach((dayFolder) => {
                        const dayFolderPath = path.join(yearFolderPath, monthFolder, dayFolder);
                        const dayFolderStat = fs.statSync(dayFolderPath);
                        if(!dayFolderStat.isDirectory()){
                            console.log(`Nothing to do ${dayFolderPath}`);
                            return;
                        }
                        moveContents(dayFolderPath, monthFolderPath);
                        console.log(`rm ${dayFolderPath}`);
                        fs.rmdirSync(dayFolderPath);
                    });
                }
            });
        }
    });
}

function moveContents(source, destination) {
    const contents = fs.readdirSync(source);

    contents.forEach((content) => {
        const sourcePath = path.join(source, content);
        const destinationPath = path.join(destination, content);
        console.log(`cp ${sourcePath} -> ${destinationPath}`);
        fs.renameSync(sourcePath, destinationPath);
    });
}

const currentDirectory = process.cwd();
mergeFolders(currentDirectory);
