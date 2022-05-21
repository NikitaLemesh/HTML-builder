const  fs = require('fs/promises');
const { stat } = require('fs');
const path = require('path');

(async function() {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {encoding: 'utf8', withFileTypes: true});
    for await (const file of files) {
      if(file.isFile()) {
        const fileName = file.name.split('.')[0];
        const fileExtention = file.name.split('.')[1];
        stat(path.join(__dirname, `secret-folder/${file.name}`), (error, stats) => {
          if(error) {
            console.log(error);
          } else {
            console.log(`${fileName} - ${fileExtention} - ${stats.size}b`);
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
