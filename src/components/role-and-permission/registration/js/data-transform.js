// data-transform.js
export const mapAndUpdatePermissions = (data, selectedEditData) => {
    return data?.map((el) => {
        const updatedPermissions = el.data.map((permission) => {
            const isChecked = selectedEditData.includes(permission.id);
            return { ...permission, is_checked: isChecked };
        });

        let all_checked = updatedPermissions.every((item) => item.is_checked);

        return {
            ...el,
            is_checked: all_checked,
            data: updatedPermissions,
        };
    });
};

export const transformData = (apiResponse) => {
    const result = {
        all: true,
        view: true,
        create: true,
        update: true,
        delete: true,
    };

    const groupedData = {
        view: [],
        create: [],
        update: [],
        delete: [],
    };

    apiResponse.forEach((group) => {
        group.data.forEach((item) => {
            const actionType = item.name.split("-")[0]; // Extract action type (view, create, update, delete)
            groupedData[actionType].push(item);

            // Check if the item has is_checked set to true
            if (!item.is_checked) {
                result[actionType] = false;
                result.all = false;
            }
        });
    });

    return { groupedData, result };
};
