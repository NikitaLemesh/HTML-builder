const fs = require('fs/promises');
const path = require('path');

(async function() {
  try {
    const filesCopy = path.join(__dirname, 'files-copy');
    const filesForCopy = path.join(__dirname, 'files');
    await fs.mkdir(filesCopy, { recursive: true });
    await fs.rm(filesCopy, { recursive: true });
    await fs.mkdir(filesCopy, { recursive: true });
    const files = await fs.readdir(filesForCopy, {encoding: 'utf8', withFileTypes: true});
    for (const file of files) {
      const copy = path.join(filesCopy, file.name);
      const exist = path.join(filesForCopy, file.name);
      await fs.copyFile(exist, copy);
    }
  } catch(err) {
    console.log(err);
  }
})();