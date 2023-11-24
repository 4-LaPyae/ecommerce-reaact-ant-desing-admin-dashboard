import { useState } from "react"
import { Pagination } from "antd"
import RolePermissionTable from "./table"
import RolePermissionForm from "./form"
import AnimatedLayout from "../../common/animated-layout"
import { Fragment } from "react"

const RolesAndPermissions = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageLimit, setPageLimit] = useState(80)
	const [total, setTotal] = useState(0)

	const handleChangePaginate = (page) => {
		setCurrentPage(page)
	}

	return (
		<AnimatedLayout>
			<Fragment>
				<RolePermissionForm />
				<RolePermissionTable
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					pageLimit={pageLimit}
					setPageLimit={setPageLimit}
					total={total}
					setTotal={setTotal}
				/>
				<Pagination
					style={{ marginTop: 20 }}
					total={total}
					showTotal={(total) => `Total ${total} items`}
					pageSize={pageLimit}
					pageSizeOptions={[pageLimit]}
					defaultCurrent={1}
					hideOnSinglePage={false}
					onChange={handleChangePaginate}
				/>
			</Fragment>
		</AnimatedLayout>
	)
}

export default RolesAndPermissions
