// Importing React and necessary dependencies
import { useState, useEffect, useCallback } from "react";
import { useCommonApiMutation } from "../../../config/api";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import { handleCheckbox, handleHeaderCheckbox } from "./js/checkbox-handlers";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedRoleData,
    setAllChecked,
    clearSelectedRoleData,
    clearAllChecked,
} from "../../../features/rolesSlice";
import { useDebounce } from "use-debounce";
import { useLocation } from "react-router-dom";

// Importing custom functions for API calls and data transformation
import { fetchSelectedEditData, searchAPI } from "./js/api-functions";
import { mapAndUpdatePermissions, transformData } from "./js/data-transform";

// Importing styles
import "./table.css";

// Main component
const RolePermissionTable = ({
    currentPage,
    setCurrentPage,
    pageLimit,
    setPageLimit,
    setTotal,
}) => {
    // Initializing React hooks and Redux
    const dispatch = useDispatch();
    const [commonApi, { isLoading }] = useCommonApiMutation();
    const [roleData, setRoleData] = useState([]);
    const selectedRoleData = useSelector(
        (state) => state.roles.selectedRoleData,
    );
    const allChecked = useSelector((state) => state.roles.allChecked);

    const [inputValue, setInputValue] = useState("");
    const [debouncedValue] = useDebounce(inputValue, 600);

    const { state } = useLocation();
    const editData = state?.editData;

    // Fetching data from the API on component mount and cleaning up on unmount
    useEffect(() => {
        fetchData();

        return () => {
            dispatch(clearSelectedRoleData());
            dispatch(clearAllChecked());
        };
    }, []);

    // Function to fetch data from the API
    const fetchData = async () => {
        let id = editData?.id;

        if (id) {
            const selectedEditData = await fetchSelectedEditData(id, commonApi);
            const { data } = await searchAPI(
                "",
                currentPage,
                pageLimit,
                commonApi,
            );

            const updatedRoleData = mapAndUpdatePermissions(
                data,
                selectedEditData,
            );

            const { result } = transformData(updatedRoleData);

            dispatch(setAllChecked(result));
            dispatch(setSelectedRoleData(selectedEditData));
        } else {
            dispatch(clearSelectedRoleData());
            dispatch(clearAllChecked());
        }
    };

    // Function to handle input change
    const handleInputChange = (value) => {
        setInputValue(value);
    };

    // Initial function to fetch data on input debounce
    const initialFn = async (debouncedVal) => {
        const { data, page, total_group_count, limit } = await searchAPI(
            debouncedVal,
            currentPage,
            pageLimit,
            commonApi,
        );

        setTotal(total_group_count);
        setCurrentPage(page);
        setPageLimit(limit);
        filterIsChecked(data);
    };

    // Fetch data on input debounce
    useEffect(() => {
        initialFn(debouncedValue);
    }, [debouncedValue]);

    // Function to filter and update role data based on checked status
    const filterIsChecked = useCallback(
        (data) => {
            const updatedRoleData = data?.map((el) => {
                const updatedPermissions = el.data.map((permission) => {
                    const isChecked = selectedRoleData.includes(permission.id);
                    return { ...permission, is_checked: isChecked };
                });

                let all_checked = updatedPermissions.every(
                    (item) => item.is_checked,
                );

                return {
                    ...el,
                    is_checked: all_checked,
                    data: updatedPermissions,
                };
            });

            let checked = updatedRoleData?.every((item) => item.is_checked);
            dispatch(setAllChecked({ ...allChecked, all: checked }));
            setRoleData(updatedRoleData);
        },
        [selectedRoleData],
    );

    // Update the role data with the initial data when it changes
    useEffect(() => {
        filterIsChecked(roleData);
    }, [selectedRoleData]);

    // Event handler for header checkbox
    const tableHeaderCheckbox = (e) => {
        const { allCheck, selectedRole } = handleHeaderCheckbox(
            e,
            roleData,
            selectedRoleData,
            allChecked,
        );

        dispatch(setAllChecked(allCheck));
        dispatch(setSelectedRoleData(selectedRole));
    };

    // Event handler for body checkbox
    const tableBodyCheckbox = (e) => {
        const data = handleCheckbox(e, selectedRoleData);
        dispatch(setSelectedRoleData(data));
    };

    // Rendering the table
    return (
        <div className="table table-container">
            <table>
                <thead>
                    <TableHeader
                        allChecked={allChecked}
                        onChange={tableHeaderCheckbox}
                        handleInputChange={handleInputChange}
                        inputValue={inputValue}
                        isLoading={isLoading}
                    />
                </thead>
                <tbody>
                    <TableBody data={roleData} onChange={tableBodyCheckbox} />
                </tbody>
            </table>
        </div>
    );
};

// Prop types for the component
RolePermissionTable.propTypes = {
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    pageLimit: PropTypes.number.isRequired,
    setPageLimit: PropTypes.func.isRequired,
    setTotal: PropTypes.func.isRequired,
};

// Exporting the component
export default RolePermissionTable;
