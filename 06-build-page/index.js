const fs = require('fs/promises');
const path = require('path');
(async function() {
  const projectFolder = path.join(__dirname, 'project-dist');
  await fs.mkdir(projectFolder, { recursive: true });
})();

async function copyFolder(src, dist) {
  try {
    const files = await fs.readdir(src, {encoding: 'utf8', withFileTypes: true});
    await fs.mkdir(dist, { recursive: true });
    await fs.rm(dist, { recursive: true });
    await fs.mkdir(dist, { recursive: true });
    for (const file of files) {
      const distPath = path.join(dist, file.name);
      const srcPath = path.join(src, file.name);
      if(file.isDirectory()) {
        await copyFolder(srcPath, distPath);
      } else {
        await fs.copyFile(srcPath, distPath);
      }
    }
  } catch(err) {
    console.log(err);
  }
}
copyFolder(path.join(__dirname, 'assets'), path.join( __dirname + '\\project-dist', 'assets'));

(async function() {
  const folder = path.join(__dirname, 'styles');
  const files = await fs.readdir(folder, {encoding: 'utf8', withFileTypes: true});
  const filePath = path.join(__dirname, 'project-dist\\style.css');
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

(async function() {
  const templateFile = path.join(__dirname, 'template.html');
  const filePath = path.join(__dirname, 'project-dist\\index.html');
  let template = await fs.readFile(templateFile, {encoding: 'utf8', withFileTypes: true});
  const tags = template.match(/{{\s*(\w+)\s*}}/g);
  await fs.copyFile(templateFile, filePath);
  let content = '';
  try {
    for (const tag of tags) {
      const fileExtention = tag.replace(/[{}]/g, '') +'.html';
      if (fileExtention.split('.')[1] === 'html') {
        const file2 = await fs.readFile(path.join(__dirname, 'components', fileExtention), 'utf-8');
        template = template.replace(tag, file2);
        content = template;
      }
    }
    await fs.writeFile(filePath, content);
  } catch(err) {
    console.log(err);
  }
})();


 