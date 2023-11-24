// Function to handle checkbox changes
export const handleCheckbox = (e, selectedRoleData) => {
	const id = e.target.id // Get the ID of the clicked checkbox
	const isChecked = e.target.checked
	let data = []

	if (id) {
		if (isChecked) {
			data = [...selectedRoleData, id] // Add the ID to the data array
		} else {
			data = selectedRoleData.filter((item) => item !== id) // Remove the ID from the data array
		}
	} else {
		const checkbox = e.target.value // Get an array of checkboxes
		const idArray = checkbox.map((item) => item.id) // Extract IDs from the checkboxes

		if (isChecked) {
			data = [...selectedRoleData, ...idArray] // Add the IDs to the data array
		} else {
			data = selectedRoleData.filter((item) => !idArray.includes(item)) // Remove the IDs from the data array
		}
	}

	return data
}

// Function to handle header checkbox (all/individual checkboxes)
export const handleHeaderCheckbox = (
	e,
	roleData,
	selectedRoleData,
	allChecked
) => {
	const value = e.target.value // Get the value of the clicked checkbox
	const data = { ...allChecked } // Create a copy of the current checkbox state
	let updatedRoleID = []

	if (value === "all") {
		data.all = !data.all // Toggle the "all" checkbox state
		data.view = data.all // Set other checkboxes to the same state as "all"
		data.create = data.all
		data.update = data.all
		data.delete = data.all

		updatedRoleID = handleAllChecked(data, roleData) // Update role IDs based on "all" state
	} else {
		data[value] = !data[value] // Toggle the state of an individual checkbox

		updatedRoleID = handleCheckColumn(
			value,
			data[value],
			roleData,
			selectedRoleData
		) // Update role IDs for individual checkbox
	}

	return { allCheck: data, selectedRole: updatedRoleID }
}

// Function to handle checking/unchecking all checkboxes
const handleAllChecked = (data, roleData) => {
	let updatedRoleID = []

	if (data.all) {
		roleData.forEach((el) => {
			const updatedPermissions = el.data.map((permission) => {
				updatedRoleID.push(permission.id) // Collect IDs of all permissions
				return { ...permission, is_checked: data.all }
			})

			return { ...el, data: updatedPermissions }
		})
	} else {
		updatedRoleID = [] // Reset the role IDs if "all" is unchecked
	}

	return updatedRoleID // Return the updated role IDs
}

// Function to handle individual column checkbox changes
const handleCheckColumn = (name, checked, roleData, selectedRoleData) => {
	let updatedRoleID = [...selectedRoleData] // Create a copy of selected role IDs

	roleData.forEach((el) => {
		const updatedPermissions = el.data.map((permission) => {
			if (permission.name.includes(name)) {
				if (checked) {
					if (!updatedRoleID.includes(permission.id)) {
						updatedRoleID.push(permission.id) // Add permission ID if checked
					}
				} else {
					updatedRoleID = updatedRoleID.filter(
						(item) => item !== permission.id
					) // Remove permission ID if unchecked
				}
			}

			return { ...permission, is_checked: checked }
		})

		return { ...el, data: updatedPermissions }
	})

	return updatedRoleID // Return the updated role IDs
}
