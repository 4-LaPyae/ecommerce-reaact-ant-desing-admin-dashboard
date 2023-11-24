// Load state from localStorage
export const loadState = () => {
	try {
		// Retrieve the serialized state from localStorage
		const serializedState = localStorage.getItem("reduxState")

		// If no state is found, return undefined
		if (serializedState === null) {
			return undefined
		}

		// Parse and return the deserialized state
		return JSON.parse(serializedState)
	} catch (error) {
		// Handle any errors and return undefined if there's an issue
		return undefined
	}
}

// Save state to localStorage
export const saveState = (state) => {
	try {
		// Exclude the 'commonApi' state from the Redux store
		const { commonApi, update, roles, ...stateToSave } = state

		// Serialize the state to a JSON string
		const serializedState = JSON.stringify(stateToSave)

		// Store the serialized state in localStorage
		localStorage.setItem("reduxState", serializedState)
	} catch (error) {
		// Handle any errors and log them to the console
		console.error("Error while saving state to localStorage:", error)
	}
}
