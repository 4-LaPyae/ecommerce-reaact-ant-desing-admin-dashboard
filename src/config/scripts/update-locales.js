import fs from 'fs/promises'
import path from 'path'

// Function to capitalize words in kebab-case
async function capitalizeWords(word) {
	const words = word.split('-')
	return words
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
		.join(' ')
}

// Function to update JSON files with a given lastPart and result
async function updateSidebarJson(lastPart, result) {
	// Array of languages or locales
	const array = ['en', 'mm', 'zh']

	// Process JSON files for each locale concurrently
	await Promise.all(
		array.map(async (el) => {
			const filePath = `public/locales/${el}/sidebar.json`
			const directory = path.join(process.cwd(), filePath)
			let template = await fs.readFile(directory, 'utf-8')
			const jsonData = JSON.parse(template)
			// Update the JSON with lastPart as the key and result as the value
			const updateJson = { ...jsonData, [lastPart]: result }
			// Write the updated JSON back to the file
			await fs.writeFile(directory, JSON.stringify(updateJson))
		})
	)
}

// Main function to process command-line arguments and update JSON files
async function main() {
	const myArgument = process.argv.find((arg) => arg.startsWith('--args='))

	if (!myArgument) {
		console.error('Argument not provided.')
		return
	}

	const data = myArgument.split('=')[1]
	const lastPart = data.split('/').slice(-1)[0]
	// Capitalize and format the last part
	const result = await capitalizeWords(lastPart)

	// Update JSON files with the lastPart and result
	await updateSidebarJson(lastPart, result)
}

// Execute the main function and handle any errors
main().catch((error) => {
	console.error('An error occurred:', error)
})