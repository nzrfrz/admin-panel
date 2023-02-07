import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Button
                onClick={() => {
                    localStorage.setItem("credentials", "value");
                    navigate("/dashboard");
                }}
            >
                L O G I N
            </Button>
        </div>
    );
};