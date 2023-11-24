import React from 'react'
import './errstyle.css'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import { selectMenu, clearUser } from '../../../features/userSlice'
import { useSelector, useDispatch } from 'react-redux'

const ErrorPage404 = ({ errStatus = 404 }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const menus = useSelector(selectMenu)

	const errorPageHandler = () => {
		!menus && dispatch(clearUser())
		navigate('/')
	}

	return (
		<div className='error-container'>
			<img
				src={`/src/assets/images/error-page/error${errStatus}.png`}
				alt='Error'
			/>
			<div className='text'>
				{/* Make changes here when more error status codes are added */}
				<h1>
					{errStatus === 404
						? 'Ooops!...Page Not Found'
						: 'Hey!... No Authorization Found'}
				</h1>

				<Button type='primary' onClick={errorPageHandler}>
					{menus ? 'Go To Dashboard' : 'Go To Login'}
				</Button>
			</div>
		</div>
	)
}

export default ErrorPage404
