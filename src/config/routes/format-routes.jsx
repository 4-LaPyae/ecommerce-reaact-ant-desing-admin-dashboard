import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import originalRoute from '.'; // Import the original route data from an external source

// Define a function called formatRoutes that takes a translation function 't' as an argument
const FormatRoutes = (t, originalRoute = []) => {
	// Define a helper function called transformData to format individual route items
	const transformData = (item) => {
		const route = { ...item }; // Shallow copy of the original route item

		// If the route item has a 'label' and 'path' property, create a link using 'Link' to the translated key
		if (item.label && item.path) {
			route.label = <Link to={item.path}>{t(item.key)}</Link>;
			route.icon = <FontAwesomeIcon icon={item.icon || 'fa-circle-exclamation'} />
		}
		// If there is no 'label' and 'path' property, set 'route.label' to the translated key only
		else {
			route.label = t(item.key);
			route.icon = <FontAwesomeIcon icon={item.icon || 'fa-circle-exclamation'} />
		}

		// If the route item has 'children' and the array has elements, map over the children
		if (item.children && item.children.length > 0) {
			// For each child, create a link to the child's path with the translated key
			route.children = item.children.map((child) => ({
				label: <Link to={child.path}>{t(child.key)}</Link>,
				key: child.key,
			}));
		}

		return route; // Return the formatted route item
	};

	// Map over the originalRoute array and apply the transformData function to each item
	const routes = originalRoute.map(transformData);

	return routes; // Return the array of formatted route items
};

export default FormatRoutes;