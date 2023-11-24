import Marquee from 'react-fast-marquee'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

const LoopBanner = ({ type, content }) => {
	return (
		<Alert
			type={type || 'warning'}
			banner
			message={
				<Marquee pauseOnHover gradient={false}>
					{content}
				</Marquee>
			}
		/>
	)
}

LoopBanner.propTypes = {
	content: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}

export default LoopBanner