import fs from 'fs/promises';
import path from 'path';

async function generateComponent(componentName, folderPath) {
  try {
    // Construct the template file path
    const templatePath = path.join(process.cwd(), 'template.jsx');
    let template = await fs.readFile(templatePath, 'utf-8');

    // Transform the component name to kebab-case for the file name
    const fileName = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    // Replace placeholders with actual values
    template = template
      .replace(/\{\{\s*componentName\s*\}\}/g, componentName)
      .replace(/\{\{\s*fileName\s*\}\}/g, fileName);

    // Construct the full component directory path
    const componentDirectoryPath = path.join(process.cwd(), '../src/components', folderPath);

    // Check if the directory path exists, create it if it doesn't
    if (!(await directoryExists(componentDirectoryPath))) {
      await fs.mkdir(componentDirectoryPath, { recursive: true });
    }

    // Construct the full file path with the specified file name
    const componentFilePath = path.join(componentDirectoryPath, `${fileName}.jsx`);
    await fs.writeFile(componentFilePath, template);

    console.log(`Generated component: ${componentFilePath}`);
  } catch (error) {
    console.error('Error generating component:', error);
  }
}

async function directoryExists(dirPath) {
  try {
    await fs.access(dirPath);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

const componentName = process.argv[2];
const folderPath = process.argv[3];

if (!componentName || !folderPath) {
  console.error('Please provide a component name and folder path.');
  process.exit(1);
}

generateComponent(componentName, folderPath);