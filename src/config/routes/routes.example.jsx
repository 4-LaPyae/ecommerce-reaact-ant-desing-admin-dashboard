import {
	PieChartOutlined,
	UserOutlined,
} from '@ant-design/icons';

const Routes = [
	{
		label: 'Dashboard',
		path: '/dashboard',
		key: 'dashboard',
		icon: <PieChartOutlined />,
	},
	{
		label: 'User Management',
		key: 'user-management',
		icon: <UserOutlined />,
		children: [
			{
				label: 'User List',
				path: '/user-management/user-list',
				key: 'user-list',
			},
			{
				label: 'User Registration',
				path: '/user-management/user-registration',
				key: 'user-registration',
			},
		],
	},
];

export default Routes
