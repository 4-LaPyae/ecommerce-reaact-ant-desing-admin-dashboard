import React, { useEffect, useState } from "react";

import PermissionForm from "./permission-form";
import PermissionList from "./permission-list";
import { useDispatch } from "react-redux";
import { clearUpdateData } from "../../features/updateSlice";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import AnimatedLayout from "../common/animated-layout";

const Permissions = () => {
    const [updateData, setUpdateData] = useState("");
    const { t } = useTranslation("form");

    const scrollAction = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <AnimatedLayout>
            <div>
                <Typography.Title
                    style={{ marginTop: 0, marginBottom: 40 }}
                    level={2}
                >
                    {t("permission-form")}
                </Typography.Title>
                <PermissionForm update={updateData} setUpdate={setUpdateData} />
                <hr />
                <PermissionList
                    translate={t}
                    setUpdate={setUpdateData}
                    scrollAction={scrollAction}
                />
            </div>
        </AnimatedLayout>
    );
};

export default Permissions;
