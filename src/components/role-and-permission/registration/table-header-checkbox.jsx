import { Checkbox, Flex, Button } from "antd"
import PropTypes from "prop-types"

const TableHeaderCheckbox = ({ checked, value, onChange }) => (
	<Flex gap={6} justify="center" align="center">
		<Button type="text" onClick={onChange} value={value}>
			{/* <Checkbox
				checked={checked}
				value={value}
				onChange={onChange}
			/> */}
			<span style={{ pointerEvents: "none" }} className="text-white-bold">
				{value ? value[0].toUpperCase() + value.slice(1) : "Default"}
			</span>
		</Button>
	</Flex>
)

TableHeaderCheckbox.propTypes = {
	// checked: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default TableHeaderCheckbox
