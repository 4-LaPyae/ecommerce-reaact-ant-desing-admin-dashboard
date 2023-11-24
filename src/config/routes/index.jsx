import { useSelector } from 'react-redux'
import { Suspense, lazy } from 'react'
import { selectMenu } from '../../features/userSlice'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import useModifiedRoutes from '../../hooks/routes/use-modifed-routes'
import LoadingFallback from '../../components/common/loading-fallback'
import PrivateRoutes from './privateRoutes'
import ScrollToTop from '../../components/common/scroll-to-top'
const Login = lazy(() => import('../../components/authentication/login'))
const AppLayout = lazy(() => import('../../components/layouts'))
const ErrorPage404 = lazy(() => import('../../components/error-pages/404'))

const Router = () => {
	const menus = useSelector(selectMenu)
	const modifiedRoutes = useModifiedRoutes(menus)

	const config = createBrowserRouter([
		// {
		// 	path: '/',
		// 	element: (
		// 		<PrivateRoutes>
		// 			<Suspense fallback={<LoadingFallback />}>
		// 				<Login />
		// 			</Suspense>
		// 		</PrivateRoutes>
		// 	),
		// },
		{
			path: '/login',
			element: (
				<PrivateRoutes>
					<Suspense fallback={<LoadingFallback />}>
						<Login />
					</Suspense>
				</PrivateRoutes>
			),
		},
		{
			path: '/',
			element: (
				<PrivateRoutes>
					<Suspense fallback={<LoadingFallback />}>
						<ScrollToTop />
						<AppLayout />
					</Suspense>
				</PrivateRoutes>
			),
			children: modifiedRoutes,
		},
		{
			path: '/*',
			element: <ErrorPage404 />,
		},
	])

	return <RouterProvider router={config} />
}

export default Router