import { Form, Input, Button } from 'antd';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
	const { t } = useTranslation('form');
	const { t: v } = useTranslation('validation');

	// throw new Error("Hell");

	return (
		<Fragment>
			<h2>Dashboard</h2>
			{/* <Form>
			<h1>{t('first_name')}</h1>
				<Form.Item name="name">
					<Input placeholder={t('first_name')} />
				</Form.Item>
				<h1>{t('email')}</h1>
				<Form.Item name="email">
					<Input placeholder={t('email')} />
				</Form.Item>
				<Button type="primary">Primary</Button>
			</Form> */}
		</Fragment>
	);
};

export default Dashboard;
