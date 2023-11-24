import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { toggleMode } from '../../../features/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

const SwitchMode = () => {
	const darkMode = useSelector((state) => state.darkMode)
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(toggleMode())
	}

	return (
		<Button
			// type='text'
			shape='circle'
			onClick={handleClick}
			icon={
				darkMode ? (
					<FontAwesomeIcon
						icon={faSun}
						style={{ fontSize: '21px' }}
					/>
				) : (
					<FontAwesomeIcon
						icon={faMoon}
						style={{ fontSize: '21px' }}
					/>
				)
			}
		></Button>
	)
}

export default SwitchMode
