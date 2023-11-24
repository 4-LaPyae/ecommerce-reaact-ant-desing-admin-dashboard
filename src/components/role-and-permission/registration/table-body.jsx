import { Checkbox } from 'antd';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ data, onChange }) => {
	return (
		<Fragment>
			{data &&
				data?.map((i, index) => {
					return (
						<tr key={index}>
							<td
								className='checkbox'
								style={{ minWidth: 50, maxWidth: 50 }}
							>
								<Checkbox
									checked={i.is_checked}
									value={i.data}
									onChange={onChange}
								/>
							</td>
							<td className='text-left'>{i.group}</td>
							{i.data.map((j, jindex) => {
								return (
									<td key={jindex}>
										<Checkbox
											value={j.id}
											checked={j.is_checked}
											onChange={onChange}
											id={j.id}
										/>
									</td>
								);
							})}
						</tr>
					);
				})}
		</Fragment>
	);
};

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default TableBody;
