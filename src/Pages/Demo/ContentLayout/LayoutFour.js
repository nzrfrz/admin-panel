import React, { useContext } from "react";
import { 
    theme,
    Input, 
    Button,
    Typography,
} from "antd";

// import { GlobalContext } from "../../../App";
import { GlobalContext } from "../../../GlobalContext";

import { ButtonInfo } from "../../../Component";

import { PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { Search } = Input;

export const LayoutFour = () => {
    const { isDarkMode } = useContext(GlobalContext);

    const {
        token: { 
            borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <div 
            className="one-column-layout-container"
            style={{
                "--bgc": isDarkMode === true ? "var(--contentContainerDarkMode)" : "var(--contentContainerLightMode)"
            }}
        >
            <div className="page-content" style={{ borderRadius: borderRadiusLG }}>
                <div className="content-title-container">
                    <div className="content-title">
                        <Title level={4}>One Column</Title>
                    </div>
                    <ButtonInfo 
                        text="Add Something"
                        icon={<PlusOutlined />}
                    />
                    <Search 
                        allowClear
                        enterButton 
                        size="large"
                        placeholder="Search Something?" 
                    />
                </div>
                <div className="page-content-container">
                    <Text>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                    </Text>
                </div>
            </div>
        </div>
    );
};