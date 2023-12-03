const fs = require('fs');
const path = require('path');

function renameFolders(directory) {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file.name);

      if (file.isDirectory()) {
        const splitName = file.name.split('_');
        const newName = splitName[splitName.length - 1];
        console.log(`I would rename ${filePath} => ${path.join(directory, newName)}`);
        fs.rename(filePath, path.join(directory, newName), (err) => {
          if (err) {
            console.error(`Error renaming ${file.name}:`, err);
          }
          renameFolders(path.join(directory, newName));
        });
      }
    });
  });
}

// Start renaming folders from the current directory
const currentDirectory = process.cwd();
renameFolders(currentDirectory);