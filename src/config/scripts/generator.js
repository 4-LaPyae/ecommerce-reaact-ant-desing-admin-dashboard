import fs from 'fs/promises'
import path from 'path'

// Function to convert kebab-case to Upper PascalCase
async function getLastPartAndUpperPascalCase(path) {
	// Split the path by '/' and get the last part
	const parts = path.split('/')
	const lastPart = parts[parts.length - 1]

	// Convert the last part to Upper Pascal Case
	const upperPascalCase = lastPart
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('')

	return upperPascalCase
}

// Function to check if a directory exists
async function directoryExists(dirPath) {
	try {
		await fs.access(dirPath)
		return true
	} catch (error) {
		if (error.code === 'ENOENT') {
			return false
		}
		throw error
	}
}

// Function to generate the component
async function generateComponent(folderPath) {
	if (!folderPath) {
		console.error('Usage: node generate-component.js --args=<folderPath>')
		process.exit(1)
	}

	// Load the component template from a file
	const templatePath = path.join(
		process.cwd(),
		'component-generator',
		'template.jsx'
	)
	const template = await fs.readFile(templatePath, 'utf-8')

	// Generate the component name in Upper PascalCase
	const componentName = await getLastPartAndUpperPascalCase(folderPath)

	// Replace placeholders in the template with actual values
	const updatedTemplate = template
		.replace(/\{\{\s*componentName\s*\}\}/g, componentName)
		.replace(/\{\{\s*fileName\s*\}\}/g, 'index')

	// Construct the directory path for the component
	const componentDirectoryPath = path.join(
		process.cwd(),
		'src',
		'components',
		folderPath
	)

	// Check if the directory path exists; create it if it doesn't
	if (!(await directoryExists(componentDirectoryPath))) {
		await fs.mkdir(componentDirectoryPath, { recursive: true })
	}

	// Construct the full file path with the specified file name
	const componentFilePath = path.join(componentDirectoryPath, 'index.jsx')

	// Write the template to the component file
	await fs.writeFile(componentFilePath, updatedTemplate)

	console.log('Component file path:', componentFilePath)
	console.log('Component', componentName, 'created in directory', folderPath)
}

// Main function to parse command-line arguments and initiate component generation
async function main() {
	const myArgument = process.argv.find((arg) => arg.startsWith('--args='))
	if (myArgument) {
		const folderPath = myArgument.split('=')[1]
		await generateComponent(folderPath)
	} else {
		console.error('Argument not provided.')
	}
}

main().catch((error) => {
	console.error('An error occurred:', error)
})