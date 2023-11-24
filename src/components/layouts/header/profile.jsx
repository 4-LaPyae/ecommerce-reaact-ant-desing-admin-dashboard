import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Typography } from 'antd'
import { clearUser } from '../../../features/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const { Text } = Typography

const Profile = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(clearUser())
		navigate('/login')
		// logout api function call here
	}

	const items = [
		{
			label: <a href='https://www.antgroup.com'>1st menu item</a>,
			key: '0',
		},
		{
			label: <a href='https://www.aliyun.com'>2nd menu item</a>,
			key: '1',
		},
		{
			type: 'divider',
		},
		{
			label: (
				<a
					onClick={logoutHandler}
					style={{ alignContent: 'center', alignItems: 'center' }}
				>
					<Text style={{ marginRight: '8px' }}>Logout</Text>
					<LogoutOutlined style={{ color: 'red' }} />
				</a>
			),
			key: '3',
		},
	]

	return (
		<Dropdown menu={{ items }} trigger={['click']} type='text'>
			<a onClick={(e) => e.preventDefault()}>
				<Badge>
					<Avatar icon={<UserOutlined />} />
				</Badge>
			</a>
		</Dropdown>
	)
}

export default Profile
