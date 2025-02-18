const fs = require('fs');
const path = require('path');

// Define the folder structure
const folders = [
  'controllers',
  'services',
  'modules',
  'entities',
  'dtos',
  'guards',
  'strategies',
  'enums',
  'middlewares',
  'utils',
];

// Define where each file should go based on its name
const fileMappings = {
  'controller': 'controllers',
  'service': 'services',
  'module': 'modules',
  'entity': 'entities',
  'dto': 'dtos',
  'guard': 'guards',
  'strategy': 'strategies',
  'enum': 'enums',
  'middleware': 'middlewares',
};

// Create folders if they don't exist
folders.forEach((folder) => {
  const folderPath = path.join(__dirname, 'src', folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
});

// Move files into their respective folders
const srcPath = path.join(__dirname, 'src');

fs.readdirSync(srcPath).forEach((file) => {
  const filePath = path.join(srcPath, file);

  // Skip if it's a folder or doesn't match a mapping
  if (fs.lstatSync(filePath).isDirectory()) return;

  const fileType = Object.keys(fileMappings).find((type) => file.includes(type));
  if (!fileType) return;

  const targetFolder = path.join(srcPath, fileMappings[fileType]);
  const targetPath = path.join(targetFolder, file);

  // Move the file
  fs.renameSync(filePath, targetPath);
  console.log(`Moved ${file} to ${targetFolder}`);
});

console.log('Restructuring complete!');
