import fs from 'mz/fs';

function getComponents(dirPath) {
  return fs.readdir(dirPath).then(listing => {
    return listing.map(filename => {
      const name = filename.slice(0, filename.lastIndexOf('.'));
      return {
        name,
        path: `${dirPath}/${filename}`
      };
    })
  });
}

function getChildren(filePath) {
  return fs.readFile(filePath, 'utf-8').then(content => {
    const tags = content.match(/<([^/][^>]+)>/g);
    const tagNames = tags.map(tag => tag.slice(1, tag.indexOf(' ')));
    const uniqueTagNames = [...new Set(tagNames)];
    return uniqueTagNames.map(name => {
      return { name };
    });
  });
}

export default {
  getComponents,
  getChildren
}