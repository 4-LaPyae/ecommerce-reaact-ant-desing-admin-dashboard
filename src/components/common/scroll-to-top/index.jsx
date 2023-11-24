import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
	// Get the current pathname using the useLocation hook
	const { pathname } = useLocation()

	// Scroll to the top of the page whenever the pathname changes
	useEffect(() => {
		// Scroll to the top of the window (0, 0)
		window.scrollTo(0, 0)
	}, [pathname])

	// This component doesn't render any content, so it returns null
	return null
}

export default ScrollToTop