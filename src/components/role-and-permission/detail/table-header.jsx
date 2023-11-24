import { theme } from 'antd';
import React from 'react';

const DetailTableHeader = () => {
	const {
		token: { colorPrimary },
	} = theme.useToken();

	return (
		<tr style={{ width: 150, background: colorPrimary }}>
			<th>Modules</th>
			<th colSpan={4}>Permissions</th>
		</tr>
	);
};

export default DetailTableHeader;
