import { Checkbox, Input, theme } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import TableHeaderCheckbox from "./table-header-checkbox"
import Loading from "../../common/loading"

const TableHeader = ({
	onChange,
	inputValue,
	handleInputChange,
	isLoading,
}) => {
	const allChecked = useSelector((state) => state.roles.allChecked)
	const arrayCRUD = ["view", "create", "update", "delete"]
	const {
		token: { colorPrimary },
	} = theme.useToken() // Extract colorBgContainer from the theme

	return (
		<tr style={{ background: colorPrimary }}>
			{CheckboxAllSelect(allChecked, onChange)}
			{SearchPermission(inputValue, handleInputChange, isLoading)}
			{arrayCRUD?.map((i, index) => {
				return (
					<th key={index} style={{ width: 150 }}>
						<TableHeaderCheckbox
							checked={allChecked[i]}
							value={i}
							onChange={onChange}
						/>
					</th>
				)
			})}
		</tr>
	)
}

TableHeader.propTypes = {
	onChange: PropTypes.func.isRequired,
	inputValue: PropTypes.string.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
}

export default TableHeader

function SearchPermission(inputValue, handleInputChange, isLoading) {
	return (
		<th
			className="text-left"
			style={{
				minWidth: 270,
				maxWidth: 270,
			}}
		>
			<Input
				className="search-input"
				placeholder="Search Permission"
				prefix={<SearchOutlined />}
				value={inputValue}
				onChange={(e) => handleInputChange(e.target.value)}
				addonAfter={isLoading && <Loading />}
			/>
		</th>
	)
}

function CheckboxAllSelect(allChecked, onChange) {
	return (
		<th className="checkbox" style={{ minWidth: 50, maxWidth: 50 }}>
			<Checkbox
				checked={allChecked.all}
				value="all"
				onChange={onChange}
			/>
		</th>
	)
}
