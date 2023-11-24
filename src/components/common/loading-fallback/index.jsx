import { Flex, Spin } from 'antd';
import { style } from './style';

// Define a loading fallback component
const LoadingFallback = () => {
	return (
		<Flex align="center" justify="center" style={style.h100}>
			<Spin tip="Loading" size="large">
				<div style={style.colorTransparent}>Loading...</div>
			</Spin>
		</Flex>
	);
};

export default LoadingFallback;