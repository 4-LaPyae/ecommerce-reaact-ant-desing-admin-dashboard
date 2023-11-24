// api-functions.js
import endpoints from "../../../../config/api/endpoints";

export const fetchSelectedEditData = async (id, commonApi) => {
    const reqData = {
        endpoint: `${endpoints.rolesEndpoint}/${id}`,
        method: "GET",
    };

    const response = await commonApi(reqData);

    return response?.data.isSuccess ? response?.data.data.permissions : [];
};

export const searchAPI = async (value, currentPage, pageLimit, commonApi) => {
    const reqData = {
        endpoint: `${
            endpoints.permissionEndpoint
        }?search=${value.trim()}&page=${currentPage}&limit=${pageLimit}`,
        method: "GET",
    };

    const response = await commonApi(reqData);

    if (response?.data?.isSuccess) {
        const { limit, page, total_group_count, data } = response.data.data;

        return {
            data,
            page,
            total_group_count,
            limit,
        };
    }
};
