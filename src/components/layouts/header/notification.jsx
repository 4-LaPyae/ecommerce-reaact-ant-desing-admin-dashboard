import React from 'react'
import { BellOutlined } from '@ant-design/icons'
import { Button, Badge } from 'antd'

const Notification = () => {
	const notificationCount = 5

	const handleNotificationClick = () => {
		// Handle click action for the notification button
		// For instance, opening a notification panel
		console.log('Notification button clicked')
	}

	return (
		<Button type='text' shape='circle' onClick={handleNotificationClick}>
			<Badge count={notificationCount}>
				<BellOutlined style={{ fontSize: '21px' }} />
			</Badge>
		</Button>
	)
}

export default Notification
