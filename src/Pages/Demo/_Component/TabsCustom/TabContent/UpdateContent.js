import React from "react";
import { 
    Typography, 
    theme 
} from 'antd';

import dayjs from 'dayjs';

import { emojiStringToHTML } from "../../../../../_helper/emojiStringToHTML";
import { updateInfoList } from "../../../../../_assets/demo/data/updateInfo";

const { Text } = Typography;

export const UpdateContent = ({setOpenDD}) => {

    const {
        token: { 
            colorBgTextHover,
            colorSuccessBgHover,
        },
    } = theme.useToken();

    return (
        <div className="update-content-container">

            {
                updateInfoList().map((data, index) => 
                <div 
                    key={index}
                    className="update-items"
                    style={{
                        "--bgc": colorSuccessBgHover,
                        "--bgHover": colorBgTextHover,
                    }}
                    onClick={() => {
                        setOpenDD(false);
                    }}
                >
                    <div className="update-item-header">
                        {data.icon}
                        <Text style={{ color: "gray" }}>{data.category}</Text>
                        <Text style={{ color: "gray" }}>*</Text>
                        <Text style={{ color: "gray" }}>{dayjs(data.date).format("MMM DD")}</Text>
                    </div>
                    <div className="update-item-title">
                        <Text strong>{emojiStringToHTML(data.title)}</Text>
                    </div>
                    <div className="update-item-desc">
                        <Text style={{ color: "gray" }}>{emojiStringToHTML(data.description)}</Text>
                    </div>
                    <div className="update-item-image">
                        {
                            data.image !== undefined &&
                            <img src={data.image} alt="profile" />
                        }
                    </div>
                </div>
                )
            }

        </div>
    );
};