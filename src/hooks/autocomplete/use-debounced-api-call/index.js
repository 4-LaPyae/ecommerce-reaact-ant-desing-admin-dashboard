import { useState, useEffect } from "react"
import _ from "lodash"

const useDebouncedApiCall = (apiCallFunction, delay = 1000) => {
	const [inputValue, setInputValue] = useState("") // Store the user input
	const [debouncedValue, setDebouncedValue] = useState("") // Store the debounced input
	const debouncedApiCall = _.debounce(apiCallFunction, delay) // Create a debounced API call function

	// Handle input change and update inputValue
	const handleInputChange = (value) => {
		setInputValue(value)
	}

	// Trigger the API call when the user pauses typing
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(inputValue)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [inputValue, delay])

	// Make the API call with the debouncedValue when it changes
	useEffect(() => {
		debouncedApiCall(debouncedValue)
	}, [debouncedValue])

	return {
		inputValue, // Current user input
		handleInputChange, // Function to handle input changes
	}
}

export default useDebouncedApiCall
