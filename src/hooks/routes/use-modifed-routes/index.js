import React, { lazy } from 'react'

const useModifiedRoutes = (routes) => {
	const modifiedRoutes =
		routes &&
		routes.length > 0 &&
		routes
			.flatMap((route) => {
				if (route.children && route.children.length > 0) {
					return route.children.map((childRoute) => ({
						id: childRoute.key,
						path: childRoute.path,
						element: React.createElement(
							lazy(() =>
								import(
									`../../../components${
										childRoute.path /* @vite-ignore */
									}`
								)
							)
						),
					}))
				} else {
					return {
						id: route.key,
						path: route.path,
						element: React.createElement(
							lazy(() =>
								import(
									`../../../components${
										route.path /* @vite-ignore */
									}`
								)
							)
						),
					}
				}
			})
			.filter((route) => route !== null)

	return modifiedRoutes
}

export default useModifiedRoutes
