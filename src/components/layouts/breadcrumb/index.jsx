import { Breadcrumb } from 'antd';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { style } from './style';

const AppBreadcrumb = () => {
	const { t } = useTranslation('sidebar');
	const location = useLocation();
	const [breadcrumb, setBreadcrumb] = useState([]);

	useEffect(() => {
		const pathSegments = location.pathname.split('/').filter(Boolean);
		const breadcrumbItems = pathSegments.map((segment) => ({
			title: t(segment),
		}));
		setBreadcrumb(breadcrumbItems);
	}, [location.pathname, t]);

	return (
		<Breadcrumb
			style={style.breadcrumb}
			items={breadcrumb}
		/>
	)
}

export default AppBreadcrumb