import React from "react";

const DetailTableBody = ({ data }) => {
    return (
        <>
            {data?.map((group, index) => (
                <React.Fragment key={index}>
                    {group?.data?.map((item, i) => (
                        <tr key={i}>
                            {i === 0 && (
                                <td
                                    style={{
                                        border: "1px lightgray solid ",
                                        borderLeft: "0px",
                                    }}
                                    rowSpan={group.data.length}
                                >
                                    {group.group}
                                </td>
                            )}
                            <td
                                style={{
                                    borderBottom:
                                        i === group.data.length - 1 &&
                                        "1px lightgray solid ",
                                }}
                            >
                                {item.name}
                            </td>
                        </tr>
                    ))}
                </React.Fragment>
            ))}
            {/* {data?.map((item, index) => (
                <React.Fragment key={index}>
                    <tr>
                        <td>{item.group}</td>
                        <td>{item.name}</td>
                    </tr>
                </React.Fragment>
            ))} */}
        </>
    );
};

export default DetailTableBody;

// const formatData = [
//     {
//         data: [
//             {
//                 name: "blah",
//                 group: "some",
//             },
//             {
//                 name: "blah",
//                 group: "some",
//             },
//             {
//                 name: "blah",
//                 group: "some",
//             },
//             {
//                 name: "blah",
//                 group: "some",
//             },
//         ],
//     },
//     {
//         group: "",
//         data: [
//             {
//                 name: "blah",
//                 group: "some",
//             },
//             {
//                 name: "blah",
//                 group: "some",
//             },
//             {
//                 name: "blah",
//                 group: "some",
//             },
//             {
//                 name: "blah",
//                 group: "some",
//             },
//         ],
//     },
// ]
