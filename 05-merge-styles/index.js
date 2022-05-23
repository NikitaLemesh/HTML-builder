const fs = require('fs/promises');
const path = require('path');
  
(async function() {
  const folder = path.join(__dirname, 'styles');
  const files = await fs.readdir(folder, {encoding: 'utf8', withFileTypes: true});
  const filePath = path.join(__dirname, 'project-dist\\bundle.css');
  await fs.writeFile(filePath, '');
  await fs.rm(filePath, { recursive: true });
  try {
    let text = '';
    for (const file of files) {
      const fileExtention = file.name.split('.')[1];
      if(fileExtention === 'css') {
        const way = folder + '\\' + file.name;
        let chunk = await fs.readFile(way, 'utf-8');
        chunk = chunk + '\n';
        text += chunk;
      }
    }
    await fs.writeFile(filePath, text);
  } catch(err) {
    console.log(err);
  }
})();